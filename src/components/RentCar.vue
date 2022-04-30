<template>
  <div class="rent">
    <div class="rent--dark">
      <form class="form rent__form">
        <h1>Арендовать</h1>
        <label for="rentDate">Взять на прокат до:</label>
        <input 
          id="rentDate"
          type="date"
          placeholder="Username"
          autocomplete="off"
          autofocus
        >
        <button type="submit">Аренда!</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RentCar'
}
</script>