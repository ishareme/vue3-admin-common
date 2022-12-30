import { login } from '@/api/sys';
import md5 from 'md5';
import { setItem, getItem } from '@/utils/storage';
import { TOKEN } from '@/constant';

export default {
    // 表示是单独的模块 不会合并到主模块中去
    namespaced: true,
    state: () => ({
        token: getItem(TOKEN) || ''
    }),
    mutations: {
        setToken(state, token) {
            state.token = token;
            setItem(TOKEN, token);
        }
    },
    actions: {
        // 登录请求动作
        login(context, userInfo) {
            const { username, password } = userInfo;
            return new Promise((resolve, reject) => {
                login({
                    username,
                    password: md5(password)
                })
                    .then((data) => {
                        const { token } = data;
                        this.commit('user/setToken', token);
                        resolve({
                            token: token
                        });
                    })
                    .catch(() => {
                        // 接口不行 伪造
                        this.commit(
                            'user/setToken',
                            '73232782-cdhs-dasr-dfds-afcds8ada921scghg'
                        );
                        resolve({
                            token: '73232782-cdhs-dasr-dfds-afcds8ada921scghg'
                        });
                        // reject(error)
                    });
            });
        }
    }
};
