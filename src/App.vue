<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">FORLOUD</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3" href="#">Sign out</a>
      </div>
    </div>
  </header>

  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="www.naver.com#"> <!-- # 뒤에 페이지 이동 url 작성 참고로 포트번호 입력-->
                <span data-feather="home"></span>
                <router-link to="/">Main Input</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <!-- # 뒤에 페이지 이동 url 작성-->
                <span data-feather="file"></span>
                <router-link to="/result">Result Page</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <!-- # 뒤에 페이지 이동 url 작성-->
                <span data-feather="shopping-cart"></span>
                <router-link to="/register">Register Page</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <!-- # 뒤에 페이지 이동 url 작성-->
                <span data-feather="users"></span>
                Balance
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <!-- # 뒤에 페이지 이동 url 작성-->
                <span data-feather="bar-chart-2"></span>
                Etc1
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <!-- # 뒤에 페이지 이동 url 작성-->
                <span data-feather="layers"></span>
                Etc2
              </a>
            </li>
          </ul>

        </div>
      </nav>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>

</script>

<style>

</style>

