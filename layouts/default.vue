<template>
  <section class="hero is-primary is-fullheight">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item">
              <img src="~assets/buefy.png" alt="Buefy" height="28" />
            </a>
            <span class="navbar-burger burger" data-target="navbarMenuHeroA">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" class="navbar-menu">
            <div class="navbar-end">
              <nuxt-link
                v-for="(item, key) of items"
                :key="key"
                :to="item.to"
                exact-active-class="is-active"
                class="navbar-item"
              >
                <b-icon :icon="item.icon" /> {{ item.title }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body" style="min-height:100vh;">
      <div class="container is-fluid" style="min-height:100vh;">
        <!-- <h1 class="title">
          Title
        </h1>
        <h2 class="subtitle">
          Subtitle
        </h2> -->
        <nuxt />
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <!-- <div class="hero-foot">
      <nav class="tabs">
        <div class="container">
          <ul>
            <li class="is-active"><a>Overview</a></li>
            <li><a>Modifiers</a></li>
            <li><a>Grid</a></li>
            <li><a>Elements</a></li>
            <li><a>Components</a></li>
            <li><a>Layout</a></li>
          </ul>
        </div>
      </nav>
    </div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "home",
          to: { name: "index" }
        },
        {
          title: "Inspire",
          icon: "lightbulb",
          to: { name: "inspire" }
        }
      ]
    };
  }
};
</script>
