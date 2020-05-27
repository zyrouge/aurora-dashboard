<template>
  <div id="__save__">
    <p class="__text__">
      Don't loose your changes!
    </p>
    <div class="__btns__">
      <button type="submit" class="__submitBtn__" @click="save__Child" />
      <button type="reset" class="__discardBtn__" @click="discard__Child" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    save__Child () {
      this.$emit('save', true)
    },
    discard__Child () {
      this.$emit('discard', true)
    }
  }
}
</script>

<style scoped>
#__save__ {
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

#__save__ p.__text__ {
  padding-left: 10px;
}

#__save__ .__btns__ {
  margin-left: auto;
}

#__save__ button {
  margin-left: 5px;
  cursor: pointer;
  color: white;
  height: 35px;
  width: 100px;
  border-radius: 5px;
  border: none;
  transition: 0.5s;
  font-family: Poppins;
}

#__save__ button.__submitBtn__ {
  background-color: rgb(0, 192, 0);
}

#__save__ button.__discardBtn__ {
  background-color: rgb(192, 0, 0);
}

#__save__ button.__submitBtn__:hover {
  background-color: rgb(0, 255, 0);
}

#__save__ button.__discardBtn__:hover {
  background-color: rgb(255, 0, 0);
}

#__save__:hover {
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
  #__save__ button {
    width: 130px;
  }
}

.__submitBtn__::before {
  content: "Save";
}

.__discardBtn__::before {
  content: "Discard";
}
</style>
