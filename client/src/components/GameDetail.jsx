function buildCoverUrl(defaultCoverUrl) {
  return defaultCoverUrl.replace('t_thumb', 't_cover_big').replace('//', 'https://');
}

export default function GameDetail(props) {
  const coverUrl = buildCoverUrl(props.gameData.cover.url);
  return (
    <ul>
      <li>Name: {props.gameData.name}</li>
      <li>Summary: {props.gameData.summary}</li>
      <li><img alt='cover' src={coverUrl} /></li>
    </ul>
  );
}