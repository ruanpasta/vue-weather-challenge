import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import imageLogo from "../../components/images/imageLogo.vue";

describe("imageLogo", () => {
  it("deve renderizar a imagemlogo", () => {
    const wrapper = mount(imageLogo);
    expect(wrapper.find("svg").html()).not.toBeNull();
  });

  it("deve renderizar a imagemlogo com os valores padroes", () => {
    const wrapper = mount(imageLogo);
    const wrappedAttributes = wrapper.find("svg").attributes();

    expect(wrapper.find("svg").html()).not.toBeNull();
    expect(wrappedAttributes.width).toBe("108px");
    expect(wrappedAttributes.height).toBe("16px");
  });

  it("deve renderizar a logo com base nos parametros passados", () => {
    const wrapper = mount(imageLogo, {
      props: { width: "216px", height: "32px" },
    });
    const wrappedAttributes = wrapper.find("svg").attributes();

    expect(wrapper.find("svg").html()).not.toBeNull();
    expect(wrappedAttributes).toBeTruthy();
    expect(wrappedAttributes.width).toBe("216px");
    expect(wrappedAttributes.height).toBeTruthy("32px");
  });
});
