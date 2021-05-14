<template>
  <div>
    <video playsInline autoPlay :ref="videoRef" />
    <canvas :ref="canvasRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { scanImageData } from "zbar.wasm";
import { videoStream } from "@/utils/videoStream";

export default defineComponent({
  name: "Scanner",
  setup: () => {
    const videoRef = ref<HTMLVideoElement | null>(null);
    const canvasRef = ref<HTMLCanvasElement | null>(null);

    const drawVideo = async function () {
      const ctx = canvasRef.value?.getContext("2d");

      if (ctx) {
        if (videoRef.value) {
          ctx.drawImage(videoRef.value, 0, 0, 640, 480);
        }
        const imageData = ctx.getImageData(0, 0, 640, 480);
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        const res = await scanImageData(imageData);
        if (res.length > 0) {
          const points = res[0].points;
          ctx.beginPath();
          ctx.arc(points[0].x, points[0].y, 10, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(points[1].x, points[1].y, 10, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(points[2].x, points[2].y, 10, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(points[3].x, points[3].y, 10, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.font = "25px Arial";
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(res[0].decode(), 10, 50);
        }
      }
      requestAnimationFrame(drawVideo);
    };

    onMounted(() => {
      if (videoRef.value && canvasRef.value) {
        videoStream(videoRef.value);

        canvasRef.value.width = 640;
        canvasRef.value.height = 480;
        requestAnimationFrame(drawVideo);
      }
    });

    return {
      videoRef,
      canvasRef,
    };
  },
});
</script>

<style scoped lang="scss"></style>
