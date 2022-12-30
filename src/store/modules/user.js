import { getUserInfo, login } from '@/api/sys';
import md5 from 'md5';
import { setItem, getItem, removeAllItem } from '@/utils/storage';
import { TOKEN } from '@/constant';
import router from '@/router';
import { setTimeStamp } from '@/utils/auth';

export default {
    // 表示是单独的模块 不会合并到主模块中去
    namespaced: true,
    state: () => ({
        token: getItem(TOKEN) || '',
        userInfo: {}
    }),
    mutations: {
        setToken(state, token) {
            state.token = token;
            setItem(TOKEN, token);
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
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
                        // 保存登录时间
                        setTimeStamp();
                        resolve({
                            token: token
                        });
                    })
                    .catch(() => {
                        // 接口不行 伪造
                        this.commit(
                            'user/setToken',
                            'd8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0'
                        );
                        setTimeStamp();
                        resolve({
                            token: 'd8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0'
                        });
                        // reject(error)
                    });
            });
        },

        // 获取用户信息
        async getUserInfo(context) {
            try {
                const res = await getUserInfo();
                console.log('[ 1 ]');
                this.commit('user/setUserInfo', res);
                return res;
            } catch (error) {
                // mock 数据
                const res = {
                    role: [
                        {
                            id: '1',
                            title: '超级管理员'
                        }
                    ],
                    _id: '612710a0ec87aa543c9c341d',
                    id: '0',
                    username: 'super-admin',
                    title: '超级管理员',
                    avatar: 'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png',
                    permission: {
                        menus: [
                            'userManage',
                            'roleList',
                            'permissionList',
                            'articleRanking',
                            'articleCreate'
                        ],
                        points: [
                            'distributeRole',
                            'importUser',
                            'removeUser',
                            'distributePermission'
                        ]
                    }
                };
                this.commit('user/setUserInfo', res);
                console.log('[ 2 ]');
                return res;
            }
        },
        // 退出登录
        logout() {
            this.commit('user/setToken', '');
            this.commit('user/setUserInfo', {});
            removeAllItem();
            router.push('/login');
        }
    }
};
