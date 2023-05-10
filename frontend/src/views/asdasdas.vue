<template>
  <div>
    <input type="file" ref="fileInput" multiple @change="handleFileUpload" />
    <button @click="uploadFiles">Enviar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
    };
  },
  methods: {
    handleFileUpload() {
      this.files = Array.from(this.$refs.fileInput.files);
    },
    async uploadFiles() {
      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append("images", file);
      });

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/images/image/ykpk7389",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          console.log("Imágenes subidas exitosamente");
        } else {
          console.error("Error al subir las imágenes");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
