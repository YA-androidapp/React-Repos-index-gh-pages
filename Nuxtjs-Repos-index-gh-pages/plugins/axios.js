export default function ({
  $axios,
  redirect
}) {
  $axios.onResponse(config => {
    // $axios.setHeader('Access-Control-Allow-Origin', 'https://api.github.io')
    // $axios.setHeader('Access-Control-Allow-Origin', 'https://ya-androidapp.github.io')
    $axios.setHeader('Access-Control-Allow-Origin', '*')
  })
}
