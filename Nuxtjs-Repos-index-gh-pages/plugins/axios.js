export default function ({
  $axios,
  redirect
}) {
  $axios.setToken('access_token')

  $axios.onResponse(config => {
    $axios.setHeader('Access-Control-Allow-Origin', '*')
    $axios.setHeader('Access-Control-Allow-Headers', '*')
    $axios.setHeader('Access-Control-Allow-Methods', '*')
  })
}
