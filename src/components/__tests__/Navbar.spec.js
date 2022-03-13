import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";
import ImageLogo from "@/components/images/imageLogo.vue";


describe("Navbar", () => {
  it("deve renderizar o componente", () => {
    const wrapper = mount(Navbar);
    expect(wrapper.find("nav").html()).not.toBeNull();
  });

  it("deve renderizar imagem", () => {
    const wrapper = mount(Navbar);
    const image = wrapper.getComponent(ImageLogo);

    expect(image.exists()).toBe(true);
  });
});
