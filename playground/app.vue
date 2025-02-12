<template>
  <div class="relative h-screen flex-center">
    <ul
      class="flex flex-wrap max-h-full of-y-auto justify-center p-4 md:p-8 max-w-700px max-auto gap-4"
    >
      <li
        v-for="n in 25"
        :key="n"
        class="relative"
      >
        <img
          :src="`/images/0${n}.png`"
          :alt="`Emoji_${n}`"
          class="block max-w-100px"
        />
      </li>
    </ul>
  </div>
</template>
