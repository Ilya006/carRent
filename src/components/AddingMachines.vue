<template>
  <div class="admin__wrap">
    <form class="form from__admin" @submit.prevent='onSubmitNewCar'>
      <h1 class="admin__title">Добавить машину</h1>

      <input 
        type="text" 
        placeholder="Название" 
        required
        v-model="modelCar"
      >
      <input 
        type="number" 
        placeholder="Мощность"
        required
        v-model="powerCar"
      >
      <label>
        Загрузить картинку
        <input type="file" class="admin__file" ref="imgCar" @change="handleFileUpload">
      </label>
      <div class="admin__img" v-if="showPreview">
        <img :src="imagePreview" alt="car">
      </div>
      <button class="admin__submit" :disabled="isDisabled || loadingAddCar">
        {{loadingAddCar ? 'Добавления картинки...' : 'Опубликовать'}}
      </button>

    </form>
  </div>

  <div class="admin__car--added" :class="isVisibleMsg && 'admin__car--visible'">
    <i>Новая Машина добавлена!</i>
  </div>

</template>


<script>
export default {
  name: 'AddingMachines',

  data: () => ({
    modelCar: '',
    powerCar: '',

    isVisibleMsg: false,

    file: null,
    showPreview: false,
    imagePreview: null,
  }),

  computed: {
    isDisabled() {
      if(this.modelCar && this.powerCar && this.imagePreview) {
        return false
      } else {
        return true
      }
    },
    // Процесс добавления авто
    loadingAddCar() {
      return this.$store.getters.getLoadingAddCar
    }
  },

  methods: {
    // Добавить машину 
    onSubmitNewCar() {
      const payload = {
        modelCar:  this.modelCar.split('')[0].toUpperCase() + this.modelCar.slice(1), 
        powerCar: this.powerCar, 
        imgCar: this.file
      }

      this.$store.dispatch('addNewCar', payload)
    },


    // Предпросмотр картинки машины
    handleFileUpload() {
      this.file = this.$refs.imgCar.files[0]
      let reader = new FileReader()

      reader.addEventListener("load", function () {
        this.showPreview = true
        this.imagePreview = reader.result
      }.bind(this), false);

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file)
        }
      }
    },
  },


  watch: {
    // После добавления поста обновляем форму
    loadingAddCar() {
      if(!this.loadingAddCar) {
        this.modelCar = ''
        this.powerCar = ''

        this.file = null
        this.showPreview = false
        this.imagePreview = null
        this.isVisibleMsg = true

        setTimeout(() => {
          this.isVisibleMsg = false
        }, 2000);
      }
    }
  }

}
</script>