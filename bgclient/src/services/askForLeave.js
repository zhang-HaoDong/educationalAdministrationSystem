import { request } from '@umijs/max'

export async function getAskForLeave() {
    return request('api/askForLeave', {
        method: 'GET'
    })
}