import { getArtistSimplified } from "@/lib/spotify/services/artist.service";
import { MusicArtistsSwiper } from "./MusicArtistSwiper";

const GENDERS_MUSIC = [
  { label: 'Lo mejor del K-POP clásico', id: '0Sadg1vgvaPqGTOjxu0N6c' },
  { label: 'Lo mejor del K-POP actual', id: '4SpbR6yFEvexJuaBpgAU5p' },
  { label: 'Lo mejor del Rock Peruano', id: '7J7btQloI9KSJg0o4e9Fno' },
  { label: 'Lo mejor del Rock Clásico', id: '7An4yvF7hDYDolN4m5zKBp' },
  { label: 'Lo mejor de la Electrónica', id: '5he5w2lnU9x7JFhnwcekXX' },
  { label: 'Lo mejor de la Cumba Peruana', id: '67ktO6WKPZ0h4cBxSBBoep' },
  { label: 'Lo mejor pa los Otakus', id: '4xCCHj0hE6EX42nCQCcL4F' },
];

export const MusicArtists = async () => {
  const gendersMap = GENDERS_MUSIC.map(async (g) => {
    const res = await getArtistSimplified(g.id);
    if (!res.ok) return null;
    return (<MusicArtistsSwiper key={g.id} data={res.dataRes} text={g.label} />)
  })

  return (
    <div className="w-full flex flex-col gap-6">
      {gendersMap}
    </div>
  )
};