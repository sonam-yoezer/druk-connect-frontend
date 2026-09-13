import type { LucideIcon } from "lucide-react";
import { BookOpen, Car, ChefHat, Clock3, Scissors, Truck } from "lucide-react";

export type Category = {
  title: string;
  icon: LucideIcon;
};

export type Spotlight = {
  name: string;
  city: string;
  image: string;
  description: string;
  highlight: string;
};

export type Listing = {
  category: string;
  title: string;
  location: string;
  postedBy: string;
  price?: string;
  priceUnit?: string;
  image: string;
  accent: "maroon" | "pine" | "gold";
  free?: boolean;
};

export const categories: Category[] = [
  {
    title: "Car rental",
    icon: Car,
  },
  {
    title: "Home cooking",
    icon: ChefHat,
  },
  {
    title: "Tailoring",
    icon: Scissors,
  },
  {
    title: "Tutoring",
    icon: BookOpen,
  },
  {
    title: "Moving help",
    icon: Truck,
  },
  {
    title: "All services",
    icon: Clock3,
  },
];

export const spotlights: Spotlight[] = [
  {
    name: "Dechen P.",
    city: "Perth, WA",
    image:
      "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=200&q=80",
    description: "Given",
    highlight: "6 free airport pickups",
  },
  {
    name: "Sonam T.",
    city: "Melbourne, VIC",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    description: "Offered",
    highlight: "4 free tutoring sessions",
  },
  {
    name: "Pema D.",
    city: "Canberra, ACT",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80",
    description: "Helped",
    highlight: "5 families move house",
  },
];

export const listings: Listing[] = [
  {
    category: "Car rental",
    title: "2019 Toyota Camry, self-drive, negotiable",
    location: "Perth, WA",
    postedBy: "Tashi",
    price: "$55",
    priceUnit: "/ day, negotiable",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&q=80",
    accent: "maroon",
  },
  {
    category: "Home cooking",
    title: "Ema datshi & momos, catered for events",
    location: "Melbourne, VIC",
    postedBy: "Pema",
    price: "From $12",
    priceUnit: "/ head",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
    accent: "pine",
  },
  {
    category: "Tailoring",
    title: "Kira & gho stitching, made to order",
    location: "Canberra, ACT",
    postedBy: "Dorji",
    price: "From $80",
    priceUnit: "/ piece",
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&q=80",
    accent: "gold",
  },
  {
    category: "Car rental",
    title: "Free airport pickup for new arrivals",
    location: "Perth, WA",
    postedBy: "Dechen",
    price: "Free",
    image:
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=500&q=80",
    accent: "pine",
  },
];
