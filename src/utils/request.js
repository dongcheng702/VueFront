import axios from 'axios';
// 这是 Axios 提供的一个方法，用于创建一个自定义配置的 Axios 实例。
// 通过这种方式，可以创建多个 Axios 实例，每个实例可以有自己的默认配置。
const request = axios.create({
    // 设置请求的基础 URL。在这里，设置为 /api，意味着所有的请求将以 /api 作为前缀发送。这样可以简化发送请求时的 URL，只需要提供相对路径即可。
    baseURL: '/api',
    //设置请求超时时间，单位是毫秒。在这里设置为 5000，表示请求将在 5000 毫秒（即 5 秒）后超时。
    timeout: 10000
})
// 将创建的 Axios 实例 request 导出，以便在其他文件中使用
// 其他文件只需导入 request，即可使用该实例发送请求，而无需重新配置默认的 baseURL 和 timeout
export default request;