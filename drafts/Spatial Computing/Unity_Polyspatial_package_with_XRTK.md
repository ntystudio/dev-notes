---
title: "Apple Vision Pro - Unity Polyspatial package with XR Interaction Toolkit"
subtitle: "How we use Unity's XR Interaction Toolkit to build cross-platform inputs for the Apple Vision Pro which aren't provided out-of-the-box."
date: "2024-02-26"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/ctrl-shift-build-home-image.png"
tags: "unity, spatial computing, apple vision pro"
---

some text here

# Requirements and Resources
- https://discussions.unity.com/t/welcome-to-unitys-visionos-community-space/270282
- https://docs.unity3d.com/Packages/com.unity.polyspatial.visionos@1.0/changelog/CHANGELOG.html
- https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@3.0/manual/index.html
- Requires a Unity Pro license (30 day trial available)


---

# Goal
Build a mixed reality, augmented reality, or virtual reality experience that is not limited to the Vision OS platform. Want to use XR Interaction Toolkit (XRI), which maps different inputs across multiple devices to a unified interpretation, such as a “select” action.

---

# Out of the box issues
The inputs Apple provide are not mapped to what we would normally expect for this type of device. Pinch "Touches" are treated more like AR on an iPad rather than a "Touch" from an XR controller. We resolve this below.

---

# Starting with the official sample
1. Install all necessary packages
2. Import Polyspatial samples: Package manager > select Polyspatial package > Samples tab > Unity Polyspatial Samples (import)
   ![alt text](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_polyspatial_package.png)
3. Open the imported XRIDebug scene

---

# `XRIDebug` Scene breakdown
The Input Action Manager (standard XRI script) is configured with the Polyspatial Input Actions asset

  ![alt text](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_input_action_manager.png)

Opening the provided asset, Primary touch and secondary touch are the only interaction inputs. There is no distinction between left and right. Primary is the first pinch, secondary is the second pinch (other hand if the first is still pinching)

  ![alt text](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_action_maps.png)
  
Polyspatial provides the XR Touch Space Interactor gameobject with corresponding script added. This is Polyspatial specific and outside of XRI.

  ![alt text](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_XR_touch_space_interactor.png)

Examining the script reveals this description

```
/// <summary>
/// Can subscribe to a WorldTouch event from the InputSystem and directly
/// forward it to XRI interactable components via the ColliderId in the
/// WorldTouchState struct. This evades re-raycasting inside the app
/// to determine what collider was interacted with.
/// </summary>
```

What does this mean? Limitations of the Vision Pro as a developer:

While they support XRI, interactions are limited to a generic touch and non-touched state for items gazed at with the eyes. This is much less than what is provided by most other devices (left controller select pressed, right controller trigger pressed, etc).  Eye information is also hidden from developers, with no ray cast info provided to XRI from the eyes. This means XRI’s gaze input is never activated as Polyspatial does not provide that information.

---

# A breakdown of what happens in Polyspatial:
- The user’s eyes focus on an object with a collider
- The user performs the pinch gesture. Polyspatial recognizes this as a primary touch and provides an XRI touch action. It also exposes to Unity the position and rotation of the touch origin (whichever hand performed the pinch).
- The position and rotation of the touch origin is continued to be provided while the pinch is held.
- Upon pinch release, the primary touch is over.
- If a second gaze + pinch is performed (by the other hand) during this time, this is recognized as the secondary touch.

So how does this scene play out?

<video controls src="https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_xri_sample_scene.MP4" title="Title"></video>


Notice how the cube does not rotate, but just moves in terms of position. In contrast, usually XRI controllers will provide rotational information.

---

# Getting Rotational Information
Open the Manipulation sample scene. This is an example of manipulation without incorporating XRI.

<video controls src="https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_xri_manipulation_sample.MP4" title="Title"></video>

Examine the Manipulation Input Manager script on the Manager gameobject.

```
using System.Collections.Generic;
using Unity.PolySpatial.InputDevices;
using UnityEngine;
using UnityEngine.InputSystem.EnhancedTouch;
using UnityEngine.InputSystem.LowLevel;
using Touch = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace PolySpatial.Samples
{
    /// <summary>
    /// Current you can only select one object at a time and only supports a primary [0] touch
    /// </summary>
    public class ManipulationInputManager : MonoBehaviour
    {
        struct Selection
        {
            /// <summary>
            /// The piece that is selected
            /// </summary>
            public PieceSelectionBehavior Piece;

            /// <summary>
            /// The offset between the interaction position and the position selected object for an identity device rotation.
            /// This is computed at the beginning of the interaction and combined with the current device rotation and interaction position to translate the object
            /// as the user moves their hand.
            /// </summary>
            public Vector3 PositionOffset;

            /// <summary>
            /// The difference in rotations between the initial device rotation and the selected object.
            /// This is computed at the beginning of the interaction and combined with the current device rotation to rotate the object as the user moves their hand.
            /// </summary>
            public Quaternion RotationOffset;
        }

        internal const int k_Deselected = -1;
        readonly Dictionary<int, Selection> m_CurrentSelections = new();

        void OnEnable()
        {
            EnhancedTouchSupport.Enable();
        }

        void Update()
        {
            foreach (var touch in Touch.activeTouches)
            {
                var spatialPointerState = EnhancedSpatialPointerSupport.GetPointerState(touch);
                var interactionId = spatialPointerState.interactionId;

                // Ignore poke input--piece will get stuck to the user's finger
                if (spatialPointerState.Kind == SpatialPointerKind.Touch)
                    continue;

                var pieceObject = spatialPointerState.targetObject;
                if (pieceObject != null)
                {
                    // Swap materials and record initial relative position & rotation from hand to object for later use when the piece is selected
                    if (pieceObject.TryGetComponent(out PieceSelectionBehavior piece) && piece.selectingPointer == -1)
                    {
                        var pieceTransform = piece.transform;
                        var interactionPosition = spatialPointerState.interactionPosition;
                        var inverseDeviceRotation = Quaternion.Inverse(spatialPointerState.inputDeviceRotation);
                        var rotationOffset = inverseDeviceRotation * pieceTransform.rotation;
                        var positionOffset = inverseDeviceRotation * (pieceTransform.position - interactionPosition);
                        piece.SetSelected(interactionId);

                        // Because events can come in faster than they are consumed, it is possible for target id to change without a prior end/cancel event
                        if (m_CurrentSelections.TryGetValue(interactionId, out var selection))
                            selection.Piece.SetSelected(k_Deselected);

                        m_CurrentSelections[interactionId] = new Selection
                        {
                            Piece = piece,
                            RotationOffset = rotationOffset,
                            PositionOffset = positionOffset
                        };
                    }
                }

                switch (spatialPointerState.phase)
                {
                    case SpatialPointerPhase.Moved:
                        if (m_CurrentSelections.TryGetValue(interactionId, out var selection))
                        {
                            // Position the piece at the interaction position, maintaining the same relative transform from interaction position to selection pivot
                            var deviceRotation = spatialPointerState.inputDeviceRotation;
                            var rotation = deviceRotation * selection.RotationOffset;
                            var position = spatialPointerState.interactionPosition + deviceRotation * selection.PositionOffset;
                            selection.Piece.transform.SetPositionAndRotation(position, rotation);
                        }

                        break;
                    case SpatialPointerPhase.None:
                    case SpatialPointerPhase.Ended:
                    case SpatialPointerPhase.Cancelled:
                        DeselectPiece(interactionId);
                        break;
                }
            }
        }

        void DeselectPiece(int interactionId)
        {
            if (m_CurrentSelections.TryGetValue(interactionId, out var selection))
            {
                // Swap materials back when the piece is deselected
                selection.Piece.SetSelected(k_Deselected);
                m_CurrentSelections.Remove(interactionId);
            }
        }
    }
}
```

There is a corresponding script on each manipulatable gameobject (ex: cube). Examine the Piece Selection Behavior script as well.

```
using UnityEngine;

namespace PolySpatial.Samples
{
    [RequireComponent(typeof(Rigidbody))]
    public class PieceSelectionBehavior : MonoBehaviour
    {
        [SerializeField]
        MeshRenderer m_MeshRenderer;

        [SerializeField]
        Material m_DefaultMat;

        [SerializeField]
        Material m_SelectedMat;

        Rigidbody m_RigidBody;

        public int selectingPointer { get; private set; } = ManipulationInputManager.k_Deselected;

        void Start()
        {
            m_RigidBody = GetComponent<Rigidbody>();
        }

        public void SetSelected(int pointer)
        {
            var isSelected = pointer != ManipulationInputManager.k_Deselected;
            selectingPointer = pointer;
            m_MeshRenderer.material = isSelected ? m_SelectedMat : m_DefaultMat;
            m_RigidBody.isKinematic = isSelected;
        }
    }
}
```

These two scripts demonstrate how to get the necessary information for rotation and position directly from the Polyspatial package without using XRI. Any object with the `PieceSelectionBehavior` applied will be recognized by the `ManipulationInputManager` and have position and rotation applied to it based on the pinched hand that interacted with it.

So to supplement XRI with rotational information that is missing, we want to create our own version of the Manipulation Input Manager that selectively passes information to an XRI interactable object. As positional information seems to work, we can comment out that part and only update rotational information on the interactable.

Within the `Update()`, we change `SetPositionAndRotation` to only use rotation:

```
//selection.Piece.transform.SetPositionAndRotation(position, rotation);
selection.Piece.transform.rotation = rotation;
```

In the `XRIDebug` sample scene, add the created manager and corresponding helper scripts to each interactable object. Now rotational information will be applied despite not being supplied originally.

**Ensure track rotation is unchecked on the interactable script**, as this overrides the rotational information we are supplying (with no rotation, as no rotation is submitted to XRI via Polyspatial).

![alt text](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_remove_track_rotation.png)

Here is the original XRIDebug sample scene with the changes applied:
<video controls src="https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_xri_rotation_sample.MP4" title="Title"></video>

---

# Getting Positional Information
Just as we supply rotational information, we can supply the positional information as well (the original sample script does both). 

> This is not needed if we are using XRI, but it is a simple capability to add just in case we find a scenario it is needed in the future. Wrap it in a conditional check.

```
//selection.Piece.transform.SetPositionAndRotation(position, rotation);
selection.Piece.transform.position = position;
```

---

# Applying throw on detach

With the XRIDebug scene we added a plane to catch any falling cubes and unchecked `is kinematic` on the rigidbodies. On the right cube, we added gravity.
![alt text](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_applying_throw_on_detach.png)

On the XR Grab Interactable, check off `throw on detach`.
![alt text](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_disable_throw_on_detach.png)

Now objects will be thrown in the direction of release.
<video controls src="https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_velocity_sample.MP4" title="Title"></video>

You're all set to do physics based fun with Polyspatial and XRI!

However...if you recall the manipulation scene, objects cannot be "thrown" there. Rather, they drop on release without force applied based on how it was moved. As we supplied XRI with Polyspatial rotational information, we can also supply the Polyspatial sample script with the velocity logic from XRI.

Duplicate the throw on detach methods used in XRI, in particular `ResetThrowSmoothing`, `EndThrowSmoothing`, `GetSmoothedVelocityValue`, and `StepThrowSmoothing` and related variables / constants. I put them into the helper script on the interactable objects so that the force values can be tweaked on a per iteractable basis if needed.

We only want to update the velocity related functions while an object is “touched”, so we reset at the beginning of the touch, update as it is held, and apply the calculated when released. Within the manager's update function:

```
bool hasSelection = m_CurrentSelections.TryGetValue(interactionId, out var _selection);

switch (spatialPointerState.phase)
{
    case SpatialPointerPhase.Began:
        if (hasSelection)
        {
            _selection.Piece.ResetThrowSmoothing();
        }
        break;
    case SpatialPointerPhase.Moved:
        if (hasSelection)
        {
            // Position the piece at the interaction position, maintaining the same relative transform from interaction position to selection pivot
            var deviceRotation = spatialPointerState.inputDeviceRotation;

            //selection.Piece.transform.SetPositionAndRotation(position, rotation);
            if (_selection.Piece.UpdateRotation)
            {
                var rotation = deviceRotation * _selection.RotationOffset;
                _selection.Piece.transform.rotation = rotation;
            }
            if (_selection.Piece.UpdatePosition)
            {
                var position = spatialPointerState.interactionPosition + deviceRotation * _selection.PositionOffset;
                _selection.Piece.transform.position = position;
            }
            _selection.Piece.StepThrowSmoothing(new Pose(_selection.Piece.transform.position, _selection.Piece.transform.rotation), Time.deltaTime);
        }
        break;
    case SpatialPointerPhase.None:
        DeselectPiece(interactionId);
        break;
    case SpatialPointerPhase.Ended:
        if (hasSelection)
        {
            _selection.Piece.EndThrowSmoothing();
        }
        DeselectPiece(interactionId);
        break;
    case SpatialPointerPhase.Cancelled:
        DeselectPiece(interactionId);
        break;
}
```

Now, even if you don't want to include XRI, you can toss objects around with Polyspatial.

---

# Complete Code

Here is the complete code we came up with from the two sample scenes:

---

# VisionXRIManipulationInputManager.cs

something here

```
#if UNITY_VISIONOS
using System;
using System.Collections.Generic;
using Unity.PolySpatial.InputDevices;
using UnityEngine;
using UnityEngine.InputSystem.EnhancedTouch;
using UnityEngine.InputSystem.LowLevel;
using Touch = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace NTY
{
    /// <summary>
    /// Current you can only select one object at a time and only supports a primary [0] touch
    /// </summary>
    public class VisionXRIManipulationInputManager : MonoBehaviour
    {
        struct Selection
        {
            /// <summary>
            /// The object that is selected
            /// </summary>
            public XRISelectionHelper Piece;

            /// <summary>
            /// The offset between the interaction position and the position selected object for an identity device rotation.
            /// This is computed at the beginning of the interaction and combined with the current device rotation and interaction position to translate the object
            /// as the user moves their hand. NOT NEEDED FOR XRI
            /// </summary>
            public Vector3 PositionOffset;

            /// <summary>
            /// The difference in rotations between the initial device rotation and the selected object.
            /// This is computed at the beginning of the interaction and combined with the current device rotation to rotate the object as the user moves their hand.
            /// </summary>
            public Quaternion RotationOffset;
        }

        internal const int k_Deselected = -1;
        readonly Dictionary<int, Selection> m_CurrentSelections = new();

        void OnEnable()
        {
            EnhancedTouchSupport.Enable();
        }

        void Update()
        {
            foreach (var touch in Touch.activeTouches)
            {
                var spatialPointerState = EnhancedSpatialPointerSupport.GetPointerState(touch);
                var interactionId = spatialPointerState.interactionId;

                // Ignore poke input--piece will get stuck to the user's finger
                if (spatialPointerState.Kind == SpatialPointerKind.Touch)
                    continue;

                var pieceObject = spatialPointerState.targetObject;
                if (pieceObject != null)
                {
                    // Swap materials and record initial relative position & rotation from hand to object for later use when the piece is selected
                    if (pieceObject.TryGetComponent(out XRISelectionHelper piece) && piece.selectingPointer == -1)
                    {
                        var pieceTransform = piece.transform;
                        var interactionPosition = spatialPointerState.interactionPosition;
                        var inverseDeviceRotation = Quaternion.Inverse(spatialPointerState.inputDeviceRotation);
                        var rotationOffset = inverseDeviceRotation * pieceTransform.rotation;
                        var positionOffset = inverseDeviceRotation * (pieceTransform.position - interactionPosition);
                        piece.SetSelected(interactionId);

                        // Because events can come in faster than they are consumed, it is possible for target id to change without a prior end/cancel event
                        if (m_CurrentSelections.TryGetValue(interactionId, out var selection))
                        {
                            selection.Piece.SetSelected(k_Deselected);
                        }

                        m_CurrentSelections[interactionId] = new Selection
                        {
                            Piece = piece,
                            RotationOffset = rotationOffset,
                            PositionOffset = positionOffset
                        };
                    }
                }

                bool hasSelection = m_CurrentSelections.TryGetValue(interactionId, out var _selection);

                switch (spatialPointerState.phase)
                {
                    case SpatialPointerPhase.Began:
                        if (hasSelection)
                        {
                            _selection.Piece.ResetThrowSmoothing();
                        }
                        break;
                    case SpatialPointerPhase.Moved:
                        if (hasSelection)
                        {
                            // Position the piece at the interaction position, maintaining the same relative transform from interaction position to selection pivot
                            var deviceRotation = spatialPointerState.inputDeviceRotation;

                            //selection.Piece.transform.SetPositionAndRotation(position, rotation);
                            if (_selection.Piece.UpdateRotation)
                            {
                                var rotation = deviceRotation * _selection.RotationOffset;
                                _selection.Piece.transform.rotation = rotation;
                            }
                            if (_selection.Piece.UpdatePosition)
                            {
                                var position = spatialPointerState.interactionPosition + deviceRotation * _selection.PositionOffset;
                                _selection.Piece.transform.position = position;
                            }
                            _selection.Piece.StepThrowSmoothing(new Pose(_selection.Piece.transform.position, _selection.Piece.transform.rotation), Time.deltaTime);
                        }
                        break;
                    case SpatialPointerPhase.None:
                        DeselectPiece(interactionId);
                        break;
                    case SpatialPointerPhase.Ended:
                        if (hasSelection)
                        {
                            _selection.Piece.EndThrowSmoothing();
                        }
                        DeselectPiece(interactionId);
                        break;
                    case SpatialPointerPhase.Cancelled:
                        DeselectPiece(interactionId);
                        break;
                }
            }
        }

        void DeselectPiece(int interactionId)
        {
            if (m_CurrentSelections.TryGetValue(interactionId, out var selection))
            {
                // Swap materials back when the piece is deselected
                selection.Piece.SetSelected(k_Deselected);
                m_CurrentSelections.Remove(interactionId);
            }
        }
    }
}
#endif
```

---

# VisionXRIHelper.cs

something here

```
#if UNITY_VISIONOS
using System;
using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;

namespace NTY
{
    // [RequireComponent(typeof(Rigidbody))]
    public class XRISelectionHelper : MonoBehaviour
    {
        public bool UpdateRotation = true;
        public bool UpdatePosition = true;

        const int k_ThrowSmoothingFrameCount = 20;
        const float k_DefaultThrowVelocityScale = 1.5f;
        const float k_DefaultThrowAngularVelocityScale = 1f;
        const float k_DefaultThrowSmoothingDuration = 0.25f;
        const float k_DeltaTimeThreshold = 0.001f;

        int m_ThrowSmoothingCurrentFrame;
        bool m_ThrowSmoothingFirstUpdate;
        readonly float[] m_ThrowSmoothingFrameTimes = new float[k_ThrowSmoothingFrameCount];
        readonly Vector3[] m_ThrowSmoothingVelocityFrames = new Vector3[k_ThrowSmoothingFrameCount];
        readonly Vector3[] m_ThrowSmoothingAngularVelocityFrames = new Vector3[k_ThrowSmoothingFrameCount];

        Vector3 m_DetachVelocity;
        Vector3 m_DetachAngularVelocity;
        Pose m_LastThrowReferencePose;

        [SerializeField]
        bool m_ThrowOnDetach = true;
        [SerializeField]
        float m_ThrowVelocityScale = k_DefaultThrowVelocityScale;
        [SerializeField]
        float m_ThrowAngularVelocityScale = k_DefaultThrowAngularVelocityScale;
        [SerializeField]
        float m_ThrowSmoothingDuration = k_DefaultThrowSmoothingDuration;
        [SerializeField]
        AnimationCurve m_ThrowSmoothingCurve = AnimationCurve.Linear(1f, 1f, 1f, 0f);

        //[SerializeField]
        //MeshRenderer m_MeshRenderer;

        //[SerializeField]
        //Material m_DefaultMat;

        //[SerializeField]
        //Material m_SelectedMat;

        Rigidbody m_RigidBody;
        XRGrabInteractable m_Interactable;

        public int selectingPointer { get; private set; } = VisionXRIManipulationInputManager.k_Deselected;

        void Start()
        {
            m_RigidBody = GetComponent<Rigidbody>();
            m_Interactable = GetComponent<XRGrabInteractable>();
            if (m_RigidBody == null)
            {
                m_ThrowOnDetach = false; // can't apply force if no rb
            }
            else if (m_RigidBody.isKinematic)
            {
                m_ThrowOnDetach = false; // no physics applied anyways
            }

            if (m_ThrowOnDetach && m_Interactable != null)
            {
                m_Interactable.throwOnDetach = false; // disable XRI throw on detach if you really want to use this one instead
            }
        }

        public void SetSelected(int pointer)
        {
            var isSelected = pointer != VisionXRIManipulationInputManager.k_Deselected;
            selectingPointer = pointer;
            // m_MeshRenderer.material = isSelected ? m_SelectedMat : m_DefaultMat;
            // m_RigidBody.isKinematic = isSelected;
        }

        public void ResetThrowSmoothing()
        {
            Array.Clear(m_ThrowSmoothingFrameTimes, 0, m_ThrowSmoothingFrameTimes.Length);
            Array.Clear(m_ThrowSmoothingVelocityFrames, 0, m_ThrowSmoothingVelocityFrames.Length);
            Array.Clear(m_ThrowSmoothingAngularVelocityFrames, 0, m_ThrowSmoothingAngularVelocityFrames.Length);
            m_ThrowSmoothingCurrentFrame = 0;
            m_ThrowSmoothingFirstUpdate = true;
        }

        public void EndThrowSmoothing()
        {
            if (m_ThrowOnDetach)
            {
                // This can be potentially improved for multi-hand throws by ignoring the frames
                // after the first interactor releases if the second interactor also releases within
                // a short period of time. Since the target pose is tracked before easing, the most
                // recent frames might have been a large change.
                var smoothedVelocity = GetSmoothedVelocityValue(m_ThrowSmoothingVelocityFrames);
                var smoothedAngularVelocity = GetSmoothedVelocityValue(m_ThrowSmoothingAngularVelocityFrames);
                m_DetachVelocity = smoothedVelocity * m_ThrowVelocityScale;
                m_DetachAngularVelocity = smoothedAngularVelocity * m_ThrowAngularVelocityScale;

                m_RigidBody.velocity = m_DetachVelocity;
                m_RigidBody.angularVelocity = m_DetachAngularVelocity;
            }
        }

        Vector3 GetSmoothedVelocityValue(Vector3[] velocityFrames)
        {
            var calcVelocity = Vector3.zero;
            var totalWeights = 0f;
            for (var frameCounter = 0; frameCounter < k_ThrowSmoothingFrameCount; ++frameCounter)
            {
                var frameIdx = (((m_ThrowSmoothingCurrentFrame - frameCounter - 1) % k_ThrowSmoothingFrameCount) + k_ThrowSmoothingFrameCount) % k_ThrowSmoothingFrameCount;
                if (m_ThrowSmoothingFrameTimes[frameIdx] == 0f)
                    break;

                var timeAlpha = (Time.time - m_ThrowSmoothingFrameTimes[frameIdx]) / m_ThrowSmoothingDuration;
                var velocityWeight = m_ThrowSmoothingCurve.Evaluate(Mathf.Clamp(1f - timeAlpha, 0f, 1f));
                calcVelocity += velocityFrames[frameIdx] * velocityWeight;
                totalWeights += velocityWeight;
                if (Time.time - m_ThrowSmoothingFrameTimes[frameIdx] > m_ThrowSmoothingDuration)
                    break;
            }

            if (totalWeights > 0f)
                return calcVelocity / totalWeights;

            return Vector3.zero;
        }

        public void StepThrowSmoothing(Pose targetPose, float deltaTime)
        {
            // Skip velocity calculations if Time.deltaTime is too low due to a frame-timing issue on Quest
            if (deltaTime < k_DeltaTimeThreshold)
                return;

            if (m_ThrowSmoothingFirstUpdate)
            {
                m_ThrowSmoothingFirstUpdate = false;
            }
            else
            {
                m_ThrowSmoothingVelocityFrames[m_ThrowSmoothingCurrentFrame] = (targetPose.position - m_LastThrowReferencePose.position) / deltaTime;

                var rotationDiff = targetPose.rotation * Quaternion.Inverse(m_LastThrowReferencePose.rotation);
                var eulerAngles = rotationDiff.eulerAngles;
                var deltaAngles = new Vector3(Mathf.DeltaAngle(0f, eulerAngles.x),
                    Mathf.DeltaAngle(0f, eulerAngles.y),
                    Mathf.DeltaAngle(0f, eulerAngles.z));
                m_ThrowSmoothingAngularVelocityFrames[m_ThrowSmoothingCurrentFrame] = (deltaAngles / deltaTime) * Mathf.Deg2Rad;
            }

            m_ThrowSmoothingFrameTimes[m_ThrowSmoothingCurrentFrame] = Time.time;
            m_ThrowSmoothingCurrentFrame = (m_ThrowSmoothingCurrentFrame + 1) % k_ThrowSmoothingFrameCount;

            m_LastThrowReferencePose = targetPose;
        }
    }
}
#endif
```

Our code is wrapped with

```
#if UNITY_VISIONOS

#endif
```
as we only need it for the Vision OS platform and do not want to have it interfere with other platforms utilizing XRI.

---

# Next time: Introducing Left and Right
There is still no concept of left hand, right hand, only primary touch and secondary touch. Interactions are limited to gaze pinch, poke.

Solution (for next time).
Moving beyond touch: Incorporating XR hands and creating custom gestures

<video controls src="https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_apple_vision_pro_unity_incorporating_hand_gestures.MP4" title="Title"></video>


---

### Link References
N/A

---

### Backlog
N/A