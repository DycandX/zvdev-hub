import projects from "@/data/projects.json";

export default function SchemaMarkup() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Zulvikar Kharisma Nur Muhammad",
    "url": "https://zvdev.cloud",
    "jobTitle": "Software Engineer",
    "sameAs": [
      "https://github.com/DycandX",
      "https://linkedin.com/in/zulvikar-kharisma"
    ]
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "zvdev.cloud Digital Ecosystem",
    "description": "Kumpulan sub-proyek digital modular di ekosistem zvdev.cloud",
    "url": "https://zvdev.cloud",
    "about": {
      "@type": "Person",
      "name": "Zulvikar Kharisma Nur Muhammad"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": projects.length,
      "itemListElement": projects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": project.name,
          "url": project.url,
          "applicationCategory": "DeveloperApplication",
          "description": project.description,
          "operatingSystem": "All"
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
    </>
  );
}
