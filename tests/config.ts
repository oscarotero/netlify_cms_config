import f from "../mod.ts";

// Set defaults
f.defaultRequired = false;
f.defaults.object.collapsed(true);
f.defaults.list.collapsed(true).minimizeCollapsed(true);
f.defaults.markdown.minimal(true);

const config = {
  backend: {
    name: "git-gateway",
    branch: "master",
  },
  media_folder: "img",
  collections: [] as Record<string, unknown>[],
};

const metas = f.object("Metas", [
  f.string("Title"),
  f.string("Description"),
  f.image("Image"),
  f.boolean("Robots").default(true),
]);

// Create Data files collection
const data = f.files("Data")
  .description("Editar diferentes datos de la web")
  .sortableFields("title")
  .preview(false)
  .file("Agenda", "/_data/home/calendar.yml", [
    f.string("Title"),
    f.markdown("Intro"),
    metas,
    f.list("Days", [
      f.string("Day"),
      f.list("Events", [
        f.string("Title"),
        f.string("Time"),
        f.list("Speakers").hint("Comma separated list of speakers identities"),
        f.markdown("Details"),
      ]),
    ]),
  ])
  .file("Speakers", "/_data/home/speakers.yml", [
    f.string("Title"),
    f.markdown("Intro"),
    metas,
    f.list("Speakers", [
      f.string("Name"),
      f.string("Id"),
      f.string("Company"),
      f.image("Image").mediaFolder("img/speakers"),
      f.list("Links", [
        f.string("Title"),
        f.select("Type", ["twitter", "linkedin", "web"]),
        f.string("Url"),
      ]),
    ]),
  ])
  .file("Partners", "/_data/home/partners.yml", [
    f.string("Title"),
    f.markdown("Intro"),
    metas,
    f.object("Main", [
      f.string("Alt"),
      f.image("Img").mediaFolder("img/partners"),
      f.string("Url"),
      f.markdown("Text"),
    ]),
    f.list("Partners", [
      f.string("Alt"),
      f.image("Img").mediaFolder("img/partners"),
      f.string("Url"),
    ]),
    f.object("Join", [
      f.string("Title"),
      f.markdown("Content"),
    ]),
  ]);

config.collections.push(data.toJSON());

export default config;
