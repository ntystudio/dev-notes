---
title: "Advanced Search Syntax in Unreal's Content Browser"
subtitle: "A guide on how to use Unreal Engine's advanced search syntax in the content browser for simple and complex asset lookup."
date: "2024-02-26"
tags: "unreal, editor, content browser"
---

Unreal Engine's content browser comes with a powerful built-in search syntax that allows for simple and complex querying.

---

# Search Syntax Structure

The advanced search syntax (beyond simply typing in the name of an asset) consists of a `Key`, `Operator`, and `Value`.

### Keys
There are many keys available as pulled from the Asset metadata in the Asset registry, with a few special keys that exist for all Asset types:
- `Name` (the asset name)
- `Path` (the asset path)
- `Class` (the asset class; `Type` is an alias)
- `ParentClass` (the asset's parent class)
- `Collection` (the names of any collections that contain the asset; `Tag` is an alias)

### Operators
Operators allow logic to be applied to search query parameters:

| Operator | Note | Example |
| ---- | ---- | ---- |
| `=` | equals | Name = Truffle |
| `!=` | not equals | Name != Truffle |
| `<` | less than | Triangles < 25000 |
| `<=` | less than or equal to | Triangles <= 25000 |
| `>` | greater than | Triangles > 5000 |
| `>=` | greater than or equal to | Triangles >= 5000 |
| `&` | and | Name = Truffle & Triangles > 5000 |
| `\|` | or | Name = Truffle \| ParentClass = Fungus  |
| `!` | not | Name != Truffle |
| `-` | negate | -Truffle |
| `+` | exact | +Truffle |
| `...` | match beginning of string | Truf... (beginning) |
| `...` | match end of string | ...uffle (end) |

### Values
Values are the target of what you are querying for, which can be (just about) anything, as seen above in the examples section of `Operators`.

---

# Finding Assets by Name
Let's consider we wanted to find all assets with `chicken` in their name.

Inputting `chicken` without any operators will return all assets that contain the string `chicken`.

Prepending the `+` operator, `+chicken`, will return all assets that contain an exact match of the string.

When the `...` operator is appended, `chicken...` will return all assets that start with the string.

When the `...` operator is prepended, `...chicken` will return all assets that end with the string.

![unreal engine find assets by name](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_find_assets_by_name.gif)

---

# Filtering Assets by Name Partials
One clear reason to subscribe to a [standard asset naming convention](https://www.tomlooman.com/unreal-engine-naming-convention-guide/) is how powerful it is in combination with the advanced search syntax.

For example, we can search for all base material decals with `M_... & MaterialDomain = Decal`:

![unreal engine find assets by search partials](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_find_material_and_material_domain_search.gif)

Or find all skeletal meshes, including those we may have not applied the proper prefix to with `SK_... | Type = Skeletal Mesh`:

![unreal engine search all skeletal meshes](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_search_all_skeletal_meshes.gif)

---

# Filtering Assets by Date Modified
`DateModified` is one of the keys you can use to filter search results.

`DateModified` only allows for `=` or `!=` comparison operators. 

> Attempting to filter beyond month (specifying the day) does not seem to return any results.

![unreal engine filter assets by date modified](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_filter_assets_by_date_modified.gif)

---

### Link References
- [UE Docs - Advanced Search Syntax](https://docs.unrealengine.com/5.3/en-US/advanced-search-syntax-in-unreal-engine/)
- [Unreal Directive - Advanced Search Syntax, What You Need To Know](https://www.unrealdirective.com/articles/advanced-search-syntax-what-you-need-to-know)
- [Unreal Directive - Advanced Search Syntax Cheat Sheet](https://www.unrealdirective.com/resource/advanced-search-syntax-cheat-sheet)

---

### Backlog
- [ ] Cover saving custom filters with video example