import { describe, expect, it } from 'vitest';
import { statusHorario } from './horario';

// São Paulo = UTC-3 (sem horário de verão desde 2019)
const sp = (iso: string) => new Date(`${iso}-03:00`);

describe('statusHorario', () => {
  it('aberto em dia útil dentro do horário', () => {
    expect(statusHorario(sp('2026-10-28T10:00:00')).aberto).toBe(true); // quarta
  });
  it('fechado antes de abrir, avisa hoje', () => {
    const s = statusHorario(sp('2026-10-28T08:00:00'));
    expect(s.aberto).toBe(false);
    expect(s.texto).toContain('hoje');
  });
  it('abre às 8h30 em ponto e fecha às 18h em ponto', () => {
    expect(statusHorario(sp('2026-10-28T08:30:00')).aberto).toBe(true);
    expect(statusHorario(sp('2026-10-28T18:00:00')).aberto).toBe(false);
  });
  it('depois do expediente de quarta, abre amanhã', () => {
    expect(statusHorario(sp('2026-10-28T19:00:00')).texto).toContain('amanhã');
  });
  it('sexta à noite e fim de semana, abre segunda', () => {
    expect(statusHorario(sp('2026-10-30T19:00:00')).texto).toContain('segunda');
    expect(statusHorario(sp('2026-10-31T11:00:00')).texto).toContain('segunda'); // sábado
    expect(statusHorario(sp('2026-11-01T11:00:00')).texto).toContain('segunda'); // domingo
  });
  it('usa o fuso de São Paulo mesmo com instante em UTC', () => {
    expect(statusHorario(new Date('2026-10-28T12:00:00Z')).aberto).toBe(true); // 09:00 em SP
    expect(statusHorario(new Date('2026-10-28T23:00:00Z')).aberto).toBe(false); // 20:00 em SP
  });
});
