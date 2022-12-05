import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import WeatherInformations from "../../components/WeatherCard/WeatherInformations.vue";

const mockedInformations = [
  {
    description: "Item description",
    value: "Item value",
    valueType: "Item value type",
  },
  {
    description: "Item description 2",
    value: "Item value 2",
    valueType: "Item value type 2",
  },
];

const mockedItemClasses = {
  items: 'class="informations__items"',
  itemDescription: 'class="informations__items__item__description"',
  itemValue: 'class="informations__items__item__value"',
  itemValueType: 'class="informations__items__item__value__type"',
};

describe("WeatherInformations", () => {
  it("deve renderizar o weather informations", () => {
    const wrapper = mount(WeatherInformations, {
      props: { informations: [] },
    });

    expect(wrapper.classes("informations")).toBe(true);
  });

  it("deve conter as classes da estilização dos items", () => {
    const wrapper = mount(WeatherInformations, {
      props: { informations: mockedInformations },
    });

    expect(wrapper.html()).toContain(mockedItemClasses.items);
    expect(wrapper.html()).toContain(mockedItemClasses.itemDescription);
    expect(wrapper.html()).toContain(mockedItemClasses.itemValue);
    expect(wrapper.html()).toContain(mockedItemClasses.itemValueType);
  });

  it("deve receber os parametros passados nos items", () => {
    const wrapper = mount(WeatherInformations, {
      props: { informations: mockedInformations },
    });

    expect(wrapper.html()).toContain("Item description");
    expect(wrapper.html()).toContain("Item value");
    expect(wrapper.html()).toContain("Item value type");
  });

  it("deve renderizar varios items", () => {
    const wrapper = mount(WeatherInformations, {
      props: { informations: mockedInformations },
    });

    expect(wrapper.html()).toContain(mockedInformations[0].description);
    expect(wrapper.html()).toContain(mockedInformations[0].value);
    expect(wrapper.html()).toContain(mockedInformations[0].valueType);
    expect(wrapper.html()).toContain(mockedInformations[1].description);
    expect(wrapper.html()).toContain(mockedInformations[1].value);
    expect(wrapper.html()).toContain(mockedInformations[1].valueType);
  });

  it("deve renderizar a informacao de ultima atualizacao", () => {
    const wrapper = mount(WeatherInformations, {
      props: { informations: [], lastUpdate: new Date() },
    });

    expect(wrapper.html()).toContain('class="informations__updated"');
  });
});
