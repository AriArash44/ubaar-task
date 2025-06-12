<template>
  <header class="d-flex bg-white justify-content-between align-items-center p-3
  border-grey-border border-bottom">
    <img src="/images/achareh.svg" alt="achareh Icon">
    <nav class="d-flex gap-3">
      <slot name="nav"></slot>
    </nav>
  </header>
  <main class="d-flex justify-content-center align-items-center">
    <slot name="main"></slot>
  </main>
</template>