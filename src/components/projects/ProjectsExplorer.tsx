"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";

import CategoryBar from "./CategoryBar";
import FeaturedProject from "./FeaturedProject";
import OurProjects from "./OurProjects";

/* Category icons, Featured Project and the Our Projects grid. The icon row and the grid's category dropdown share
   one filter; picking an icon scrolls down to the grid (Featured Project sits in between). */
const ProjectsExplorer = () => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const lenis = useLenis();

  const pickCategory = (value: string) => {
    setCategory(value);
    const grid = document.getElementById("our-projects");
    if (!grid) return;
    if (lenis) lenis.scrollTo(grid, { offset: -80 });
    else grid.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <CategoryBar value={category} onChange={pickCategory} />
      <FeaturedProject />
      <OurProjects
        category={category}
        onCategoryChange={setCategory}
        location={location}
        onLocationChange={setLocation}
        query={query}
        onQueryChange={setQuery}
      />
    </>
  );
};

export default ProjectsExplorer;
