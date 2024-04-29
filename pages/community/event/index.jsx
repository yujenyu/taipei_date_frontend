import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Event() {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, []);
}
