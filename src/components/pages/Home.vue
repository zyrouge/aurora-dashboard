<template>
  <div class="Home">
    <br />
    <Hero />
  </div>
</template>

<script>
// import Multiselect from "vue-multiselect";
// import JQuery from "jquery";
// const $ = JQuery;
import Hero from "../partials/Hero";

export default {
  metaInfo: {
    title: "Home"
  },
  components: {
    // Multiselect,
    Hero
  },
  data() {
    return {
      roles: {
        state: false,
        value: [{ name: "Owner", id: "1242432131" }],
        options: [
          { name: "Owner", id: "1242432131", $isDisabled: true },
          { name: "Mod", id: "124243213132", $isDisabled: false },
          { name: "Admin", id: "1242432131424", $isDisabled: false },
          { name: "Member", id: "12424321314244", $isDisabled: false }
        ]
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Dropdown
  <div>
      <label class="typo__label">Role Selection</label>
      <multiselect
        v-model="roles.value"
        tag-placeholder="Add this Role"
        placeholder="Search or add a Role"
        label="name"
        track-by="id"
        :options="roles.options"
        :multiple="true"
        :taggable="true"
        :searchable="false"
        :loading="roles.state"
        :hideSelected="true"
      ></multiselect>
    </div>
-->

<!-- Save PopUp
  <div id="save">
      <p class="text">Don't loose your changes!</p>
      <div class="btns">
        <button type="submit" class="submitBtn">Save</button>
        <button type="reset" class="discardBtn">Discard</button>
      </div>
    </div>
-->

<style>
/* Multiselect CSS */
.multiselect__tags {
  border: 2px solid var(--fuschia);
}

.multiselect__tags .multiselect__tag {
  background: var(--fuschia);
}

.multiselect__content-wrapper {
  border: 2px solid var(--fuschia);
  border-top: transparent;
}

.multiselect__tag-icon {
  background: rgba(169, 98, 197, 0.5);
  border-radius: 0;
  transition: 0.3s;
}

.multiselect__tag-icon:hover {
  background: rgb(169, 98, 197);
}

.multiselect__tag-icon:after {
  content: "×";
  color: white;
  font-size: 14px;
}

.multiselect__option:hover,
.multiselect__option:active,
.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background: var(--fuschia);
}
</style>
