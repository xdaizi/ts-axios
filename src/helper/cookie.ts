// 定义cookie 对象
const cookie = {
    // 读方法
    read(name: string): string | null {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
        return match ? decodeURIComponent(match[3]) : null
    }
}

export default cookie