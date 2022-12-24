<template>
  <div class="page-loader">
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
  </div> 
</template>


<style lang="scss" scoped>
   $colors: #e21009, #dfe20f, #0fac17, #1013b1;
  // -----------------------------------------------------
  .page-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(243, 241, 241);
    z-index: 999;
  }
  // -----------------------------------------------------
  .cube{
    width: 20px;
    height: 20px;
    margin-right: 10px;
    @for $i from 1 through length($colors) {
      &:nth-child(#{$i}) {
        background-color: nth($colors, $i);
      }
    }
    &:first-child {
      animation: left 1s infinite;
    }
    &:last-child {
      animation: right 1s infinite .5s;
    }
  }
  // -----------------------------------------------------
  @keyframes left {
    40% {
      transform: translateX(-60px);
    }
    50% {
      transform: translateX(0);      
    }
  }
  @keyframes right {
    40% {
      transform: translateX(60px);
    }
    50% {
      transform: translateX(0);
    }
  }
</style>