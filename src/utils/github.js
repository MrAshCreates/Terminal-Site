import axios from 'axios';

export async function fetchRepos(user = 'MrAshCreates') {
  const { data } = await axios.get(`https://api.github.com/users/${user}/repos`);
  return data;
}