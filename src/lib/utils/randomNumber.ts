export default function randomNumber(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min));
}
