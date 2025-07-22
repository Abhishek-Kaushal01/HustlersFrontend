import React, { useState } from "react";
import { roomItems } from "../data/Data";

const roomTypes = Array.from(new Set(roomItems.map(r => r.name)));
const priceRanges = [
  { label: "Any", value: "" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$101 - $150", value: "101-150" },
  { label: "$151 - $200", value: "151-200" },
];
const features = ["Family", "Luxury", "Standard", "Dormitory"];

function filterRooms(filters) {
  return roomItems.filter(room => {
    if (filters.type && room.name !== filters.type) return false;
    if (filters.price) {
      const priceNum = Number(room.price.replace(/[^0-9]/g, ""));
      const [min, max] = filters.price.split("-").map(Number);
      if (priceNum < min || priceNum > max) return false;
    }
    if (filters.feature) {
      const f = filters.feature.toLowerCase();
      if (!room.name.toLowerCase().includes(f) && !room.description.toLowerCase().includes(f)) return false;
    }
    return true;
  });
}

export default function Book() {
  return null;
}
