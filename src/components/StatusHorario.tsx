import { useSyncExternalStore } from 'react';
import { clsx } from 'clsx';
import { site } from '@/data/site';
import { statusHorario } from '@/lib/horario';

const assinar = (aviso: () => void) => {
  const id = setInterval(aviso, 60_000);
  return () => clearInterval(id);
};
const snapshot = () => {
  const s = statusHorario();
  return `${s.aberto ? 1 : 0}|${s.texto}`;
};

/** HTML estático mostra o horário fixo (sem JS); depois da hidratação vira "Aberto agora / Fechado". */
export function StatusHorario({ className }: { className?: string }) {
  const valor = useSyncExternalStore(assinar, snapshot, () => null);
  const aberto = valor?.startsWith('1');
  return (
    <p className={clsx('flex items-center gap-2 text-sm', className)}>
      <span
        aria-hidden="true"
        className={clsx(
          'inline-block size-2.5 shrink-0 rotate-45',
          aberto ? 'bg-wa-400' : 'bg-khaki-500',
        )}
      />
      <span>{valor ? valor.slice(2) : site.horarioTexto}</span>
    </p>
  );
}
