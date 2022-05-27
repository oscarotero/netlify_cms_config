# Netlify CMS Config generator

This is a Deno's TypeScript library to generate the `config.yml` file to
configure the Netlify CMS easily. For more info about the Netlify Configuration
Options,
[go to the original documentation website](https://www.netlifycms.org/docs/configuration-options/).

## Usage example

The library is built in TypeScript, including the options descriptions as
comments, so you can take advantage of your VSCode (or any other IDE) like
autocomplete, descriptions etc.

### Create simple field

```ts
import f from "./mod.ts";

const field = f.string("Your name");

console.log(field.toJson());
```

This code generates the following result:

```js
{
  label: "Your name",
  name: "your_name",
  widget: "string"
}
```

By default, the `name` value is generated automatically from the `label`. But
you can change it or add more options:

```ts
const field = f.string("Your name")
  .name("name")
  .required(false)
  .default("Default name")
  .toJson();
```

This outputs:

```js
{
  label: "Your name",
  name: "name",
  widget: "string",
  required: false,
  "default": "Default name",
}
```

## Create a folder collection

```ts
import f from "./mod.ts";

const posts = f.folder("Posts", "/posts")
  .create(true)
  .slug("{{slug}}")
  .delete(true)
  .fields([
    f.string("Title"),
    f.datetime("Published at"),
    f.markdown("Body"),
  ])
  .toJson();
```

This outputs:

```js
{
  label: "Posts",
  name: "posts",
  folder: "/posts",
  create: true,
  slug: "{{slug}}",
  delete: true,
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string"
    },
    {
      label: "Published at",
      name: "published_at",
      widget: "datetime"
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown"
    },
  ]
}
```

## Create a files collection

```ts
import f from "./mod.ts";

const posts = f.files("Pages")
  .file("Page 1", "page-1.md", [
    f.string("Title"),
    f.datetime("Published at"),
    f.markdown("Body"),
  ])
  .file("Page 2", "page-2.md", [
    f.string("Title"),
    f.datetime("Published at"),
    f.markdown("Body"),
  ])
  .toJson();
```

## Default values

To avoid repetition, you can set default values:

```ts
import f from "./mod.ts";

// Set all fields as optional by default
f.defaultRequired = false;

// Configure settings individually by field
f.defaults.list.collapsed = true;
f.defaults.markdown.buttons = ["bold", "italic", "link"];
```
