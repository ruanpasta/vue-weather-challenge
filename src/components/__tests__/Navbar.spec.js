import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";

describe("Navbar", () => {
  it("deve renderizar o componente", () => {
    const wrapper = mount(Navbar);
    expect(wrapper.find("nav").html()).not.toBeNull();
  });

  it("deve renderizar imagem", () => {
    const wrapper = mount(Navbar);
    expect(wrapper.find("figure").html()).not.toBeNull();
  });
});
