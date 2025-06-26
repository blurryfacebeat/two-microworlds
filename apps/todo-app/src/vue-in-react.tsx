import { useRef, useEffect } from 'react';
import { createApp } from 'vue';
import App from './app.vue';
import router from './router';

export default function VueWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = createApp(App);

    app.use(router);
    app.mount(containerRef.current!);

    return () => {
      app.unmount();
    };
  }, []);

  return <div ref={containerRef} />;
}
