import { site } from '@/data/site';

const TZ = 'America/Sao_Paulo';

const toMin = (hhmm: string) => {
  const [h = '0', m = '0'] = hhmm.split(':');
  return Number(h) * 60 + Number(m);
};

export type StatusHorario = { aberto: boolean; texto: string };

/** Calcula "Aberto agora" / "Fechado" no fuso de São Paulo, independente do fuso do visitante. */
export function statusHorario(agora: Date = new Date()): StatusHorario {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(agora);
  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? '';
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const minutos = Number(get('hour')) * 60 + Number(get('minute'));
  const abre = toMin(site.horario.abre);
  const fecha = toMin(site.horario.fecha);
  const util = (site.horario.dias as readonly number[]).includes(dia);

  if (util && minutos >= abre && minutos < fecha) {
    return { aberto: true, texto: 'Aberto agora · fecha às 18h' };
  }
  const quando =
    util && minutos < abre ? 'hoje' : dia === 5 || dia === 6 || dia === 0 ? 'segunda' : 'amanhã';
  return { aberto: false, texto: `Fechado · abre ${quando} às 8h30` };
}
