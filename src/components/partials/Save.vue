<template>
  <div id="save">
    <p class="text">Don't loose your changes!</p>
    <div class="btns">
      <button type="submit" class="submitBtn" @click="save__Child">Save</button>
      <button type="reset" class="discardBtn" @click="discard__Child">Discard</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Save",
  methods: {
    save__Child() {
      this.$emit("save", true);
    },
    discard__Child() {
      this.$emit("discard", true);
    }
  }
};
</script>

<style>
#save {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: calc(100vw - 40px);
  background: rgb(56, 45, 88);
  padding: 5px;
  border-radius: 5px;
  text-align: left;
  transition: 0.25s;
  animation: savePromptAnime 0.5s;
  z-index: 999;
}

#save p.text {
  padding-left: 10px;
}

#save .btns {
  margin-left: auto;
}

#save button {
  margin-left: 5px;
  cursor: pointer;
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  border: none;
  transition: 0.5s;
  font-family: Poppins;
}

#save button.submitBtn {
  background-color: rgb(0, 192, 0);
}

#save button.discardBtn {
  background-color: rgb(192, 0, 0);
}

#save button.submitBtn:hover {
  background-color: rgb(0, 255, 0);
}

#save button.discardBtn:hover {
  background-color: rgb(255, 0, 0);
}

#save:hover {
  transform: translateY(-4px);
}

@keyframes savePromptAnime {
  0% {
    transform: translateY(100px);
  }
  80% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media screen and (min-width: 700px) {
  #save button {
    padding: 8px 55px;
  }
}
</style>
