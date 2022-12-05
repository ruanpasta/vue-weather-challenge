import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import WeatherCard from "../../components/WeatherCard/WeatherCard.vue";
import IconLoader from "../../components/icons/iconLoader.vue";
import WeatherInformations from "../../components/WeatherCard/WeatherInformations.vue";

const mockedProps = {
  name: "city",
  title: "City",
  temperature: 20,
  informations: [],
  lastUpdate: new Date(),
};

describe("WeatherCard", () => {
  it("deve renderizar o weather card", () => {
    const wrapper = mount(WeatherCard, { props: mockedProps });
    expect(wrapper.html()).toContain('class="card"');
  });

  it("deve renderizar os parâmetros obrigatorios", () => {
    const wrapper = mount(WeatherCard, { props: mockedProps });
    const temperatureElement = wrapper.find("div").text().includes("20");

    expect(wrapper.html()).toContain("City");
    expect(temperatureElement).toBe(true);
  });

  it("deve renderizar o loading", () => {
    const wrapper = mount(WeatherCard, {
      props: { loading: true, ...mockedProps },
    });

    const icon = wrapper.getComponent(IconLoader);

    expect(icon.exists()).toBe(true);
  });

  it("deve renderizar o componente weather informations", () => {
    const wrapper = mount(WeatherCard, { props: mockedProps });

    const weather = wrapper.getComponent(WeatherInformations);

    expect(weather.exists()).toBe(true);
  });

  it("deve renderizar a mensagem de erro", () => {
    const wrapper = mount(WeatherCard, {
      props: { errorMessage: "Error message", ...mockedProps },
    });

    expect(wrapper.html()).toContain("Error message");
  });

  it("deve emitir o evento para buscar os dados", async () => {
    const wrapper = mount(WeatherCard, {
      props: { errorMessage: "Error message", ...mockedProps },
    });

    await wrapper.find("button").trigger("click");

    const eventEmitted = wrapper.emitted();

    expect(eventEmitted).toHaveProperty("onGetData");
    expect(eventEmitted.onGetData).toHaveLength(1);
  });
});
