// Assortment
export { default as assortment1 } from "./assortment/assortment-1.jpg";
export { default as assortment2 } from "./assortment/assortment-2.jpg";
export { default as assortment3 } from "./assortment/assortment-3.jpg";
export { default as assortment4 } from "./assortment/assortment-4.jpg";
export { default as assortment5 } from "./assortment/assortment-5.jpg";
export { default as assortment6 } from "./assortment/assortment-6.jpg";

// Assortment Gallery
const cat1Modules = import.meta.glob("./assortment/gallery-cat-1/*", {
  eager: true,
});
export const galleryCat1 = Object.values(cat1Modules).map((m) => m.default);

const cat2Modules = import.meta.glob("./assortment/gallery-cat-2/*", {
  eager: true,
});
export const galleryCat2 = Object.values(cat2Modules).map((m) => m.default);

const cat3Modules = import.meta.glob("./assortment/gallery-cat-3/*", {
  eager: true,
});
export const galleryCat3 = Object.values(cat3Modules).map((m) => m.default);

const cat4Modules = import.meta.glob("./assortment/gallery-cat-4/*", {
  eager: true,
});
export const galleryCat4 = Object.values(cat4Modules).map((m) => m.default);

const cat5Modules = import.meta.glob("./assortment/gallery-cat-5/*", {
  eager: true,
});
export const galleryCat5 = Object.values(cat5Modules).map((m) => m.default);

const cat6Modules = import.meta.glob("./assortment/gallery-cat-6/*", {
  eager: true,
});
export const galleryCat6 = Object.values(cat6Modules).map((m) => m.default);

// Hero
export { default as heroImage } from "./hero/hero-image.png";

// Reviews
export { default as dmitrySokolov } from "./reviews/dmitry-sokolov-image.jpg";
export { default as defaultImage } from "./reviews/default-image.jpg";

// About Us
export { default as aboutUsImage } from "./about-us/about-us-image.jpg";
