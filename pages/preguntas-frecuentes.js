import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PreguntasFrecuentes() {
  const router = useRouter();

  useEffect(() => {
    router.push('/#preguntas-frecuentes');
  }, []);

  return null;
}
