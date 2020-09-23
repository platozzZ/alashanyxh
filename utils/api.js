// import request from '@/common/js/request.js'
// import cms from './cmsapi.js'
// import home from './homeapi.js'
import { enroll, cms, home } from './request.js'
// console.log(enroll);
// console.log(cms);
// console.log(home);
// 测试动态
// export function getTestList(page) { 
// 	return test.request({
// 	    url: '/api/news/list_new?page=' + page,
// 	    method: 'GET'
// 	})
// }

// 获取首页数据 /Gokart/index
export function getIndex(data) {
    return enroll.request({
        url: '/Gokart/index',
        method: 'POST',
		data: data
    })
}
// 获取活动报名列表 /Gokart/notice
export function getNotice(){ //  
	return enroll.request({
	    url: '/Gokart/notice',
	    method: 'GET'
	})
}


// 获取活动列表 /Gokart/activity
export function getActivity(data) {
    return enroll.request({
        url: '/Gokart/activity',
        method: 'POST',
		data: data
    })
}

//场地列表页 /Gokart/field
export function getField(data) {
    return enroll.request({
        url: '/Gokart/field',
        method: 'POST',
		data: data
    })
}

// 获取赛事信息 /gokart/matchInfo
export function getMatchInfo(data) {
    return enroll.request({
        url: '/gokart/matchInfo',
        method: 'POST',
		data: data
    })
}
// 获取场地详情 /Gokart/fieldinfo
export function getFieldInfo(data) {
    return enroll.request({
        url: '/Gokart/fieldinfo',
        method: 'POST',
		data: data
    })
}
// 获取场地详情动态列表 /Gokart/fielddetail
export function getFieldList(data){ //  
	return enroll.request({
	    url: '/Gokart/fielddetail',
        method: 'POST',
		data: data
	})
}

// 评论 /gokart/addComment
export function addComment(data) {
    return enroll.request({
        url: '/gokart/addComment',
        method: 'POST',
		data: data
    })
}

// 点赞 /gokart/addlike
export function addLike(data) {
    return enroll.request({
        url: '/gokart/addlike',
        method: 'POST',
		data: data
    })
}

// 获取评论列表 /Gokart/comment
export function getComment(data) {
    return enroll.request({
        url: '/Gokart/comment',
        method: 'POST',
		data: data
    })
}

// 获取cmstitle
export function getCmsType(){ //  
	return cms.request({
	    url: '/api/classify/list',
	    method: 'GET'
	})
}

// 获取首页文章列表最新 /api/news/list_new/?page=1
export function getCmsListNew(page){ //  
	return cms.request({
	    url: '/api/news/list_new?page=' + page,
	    method: 'GET'
	})
}
// 获取首页文章列表 /api/news/list/30?page=1
export function getCmsList(id,page){ //  
	return cms.request({
	    url: '/api/news/list/' + id +'?page=' + page,
	    method: 'GET'
	})
}

// 获取文章详情
export function getCmsDetail(id) {
    return cms.request({
        url: '/api/news/info/' + id,
        method: 'GET'
    })
}

// 获取文章详情推荐列表 /api/news/relatedlist/162
export function getCmsDetailList(id){ //  
	return cms.request({
	    url: '/api/news/relatedlist/' + id,
	    method: 'GET'
	})
}

// 获取文章评论列表 let resData = await _self.$https.get('/api/comment/list/' + _cid);/api/comment/list/165
export function getCommentList(id,page) {
    return cms.request({
        url: '/api/comment/list/' + id + '?page=' + page,
        method: 'GET'
    })
}
// 文章详情添加评论 /api/comment/commentadd
export function commentAdd(data) {
    return cms.request({
        url: '/api/comment/commentadd',
        method: 'POST',
		data: data
    })
}
// 文章详情 点赞 /api/news/changelikes
export function changeLikes(data) {
    return cms.request({
        url: '/api/news/changelikes',
        method: 'POST',
		data: data
    })
}
// 文章收藏 collect /news/changecollection

// 获取用户信息 /api/v1/user/counts/156
export function getUserCount(id) {
    return home.request({
        url: '/api/v1/user/counts/' + id,
        method: 'GET'
    })
}
// 登录 /api/v1/login
export function toLogin(data) {
    return home.request({
        url: '/api/v1/login',
        method: 'POST',
		data: data
    })
}
// 退出登录 /api/v1/logout
export function logOut() {
    return home.request({
        url: '/api/v1/logout',
        method: 'GET'
    })
}
// 注册 /api/v1/users/inside
export function toRegister(data) {
    return home.request({
        url: '/api/v1/users/inside',
        method: 'POST',
		data: data
    })
}
// 修改密码  /users/retrieve
export function changePwd(data) {
    return home.request({
        url: '/api/v1/users/retrieve',
        method: 'POST',
		data: data
    })
}
// 获取验证码  /api/v1/captcha
export function captCha(data) {
    return home.request({
        url: '/api/v1/captcha',
        method: 'POST',
		data: data
    })
}
// 修改头像 /api/v1/update/userInfo
export function updateAvatar(data) {
    return home.request({
        url: '/api/v1/update/userInfo',
        method: 'POST',
		data: data
    })
}

// /* 活动报名api */
// 获取活动信息 /order/create
export function getEnrollInfo(data) {
    return enroll.request({
        url: '/order/create',
        method: 'POST',
		data: data
    })
}
// 获取俱乐部列表 /group/club
export function getClubList() {
    return enroll.request({
        url: '/group/club',
        method: 'GET'
    })
}
// 获取车队列表 /group/list
export function getGroup() {
    return enroll.request({
        url: '/group/list',
        method: 'GET'
    })
}
// 添加领队 /site/addmember
export function addMember(data) {
    return enroll.request({
        url: '/site/addmember',
        method: 'POST',
		data: data
    })
}
// 获取验证码 /site/phone
export function getPhoneCode(data) {
    return enroll.request({
        url: '/site/phone',
        method: 'POST',
		data: data
    })
}
// 获取活动详情 /order/sign
export function getOrderSign(data) {
    return enroll.request({
        url: '/order/sign',
        method: 'POST',
		data: data
    })
}
// 检查赛手信息 /site/checkingmember
export function checkMember(data) {
    return enroll.request({
        url: '/site/checkingmember',
        method: 'POST',
		data: data
    })
}
// checkMember20
export function checkMember20(data) {
    return enroll.request({
        url: '/site/ckmember',
        method: 'POST',
		data: data
    })
}
// 提交表单 /order/cost
export function costOrders(data) {
    return enroll.request({
        url: '/order/cost',
        method: 'POST',
		data: data
    })
}
// 保存订单 /order/save
export function saveOrders(data) {
    return enroll.request({
        url: '/order/save',
        method: 'POST',
		data: data
    })
}
// 选择支付方式 获取订单信息  /order/memberActivityDetail
export function getActivityDetail(data) {
    return enroll.request({
        url: '/order/memberActivityDetail',
        method: 'POST',
		data: data
    })
}
// 获取支付订单数据 /pay/pay
export function getOrderInfo(data) {
    return enroll.request({
        url: '/pay/pay',
        method: 'POST',
		data: data
    })
}
// 取消订单 /order/cancel
export function cancelOrder(data) {
    return enroll.request({
        url: '/order/cancel',
        method: 'POST',
		data: data
    })
}



// 获取活动订单 /order/getAllByUser
export function getOrderList(data) {
    return enroll.request({
        url: '/order/getAllByUser',
        method: 'POST',
		data: data
    })
}

// 获取订单详情  /order/memberActivityDetail
export function getOrderDetail(data) {
    return enroll.request({
        url: '/order/memberActivityDetail',
        method: 'POST',
		data: data
    })
}

// 获取成绩页面场地列表 /Gokart/fieldall
export function getFieldall() {
    return enroll.request({
        url: '/Gokart/fieldall',
        method: 'GET'
    })
}
// 获取场地某日赛节列表 /Gokart/getmatchlist
export function getMatchList(data) {
    return enroll.request({
        url: '/Gokart/getmatchlist',
        method: 'POST',
		data: data
    })
}
// 获取赛节成绩详情 /Gokart/getmatchdetail
export function getMatchDetail(data) {
    return enroll.request({
        url: '/Gokart/getmatchdetail',
        method: 'POST',
		data: data
    })
}

// 圈子首页轮播图 /api/v1/rotationChart
export function getTeamSwiper() {
    return home.request({
        url: '/api/v1/rotationChart',
        method: 'GET'
    })
}
// 圈子group列表 /api/v1/user/groups?type=
export function getGroups(type) {
    return home.request({
        url: '/api/v1/user/groups?type=' + type,
        method: 'GET'
    })
}
// 圈子动态列表 /api/v1/feeds?page=1&status=1
export function getFeeds(page,status) {
    return home.request({
        url: '/api/v1/feeds?page=' + page + '&status=' + status,
        method: 'GET'
		// data: data
    })
}

// 加入圈子tab列表 /api/v1/categorys/groups
export function getCategorys(type) {
    return home.request({
        url: '/api/v1/categorys/groups',
        method: 'GET'
    })
}
// 获取圈子名列表 /api/v1/catearea/groups?category_id=9
export function getCatearea(id) {
    return home.request({
        url: '/api/v1/catearea/groups?category_id=' + id,
        method: 'GET'
    })
}
// 关注圈子 /api/v1/groupmembers
export function groupMembers(data) {
    return home.request({
        url: '/api/v1/groupmembers',
        method: 'POST',
		data: data
    })
}
// 检测圈子名称是否可用 /api/v1/group/name
export function checkTitle(data) {
    return home.request({
        url: '/api/v1/group/name',
        method: 'POST',
		data: data
    })
}
// 创建圈子 /api/v1/groups
export function teamCreat(data) {
    return home.request({
        url: '/api/v1/groups',
        method: 'POST',
		data: data
    })
}
// 圈子主页数据 /api/v1/groups
export function clubIndex(id) {
    return home.request({
        url: '/api/v1/groups/' + id,
        method: 'GET'
    })
}
// 圈子主页动态列表 /api/v1/feeds/group/142?status=1&page=1
export function getGroupFeeds(id,page,status) {
    return home.request({
        url: '/api/v1/feeds/group/' + id + '?page=' + page + '&status=' + status,
        method: 'GET'
		// data: data
    })
}
// 圈子主页 退出圈子 signOut '/api/v1/group/exit/'+that.group_id
export function signOut(id) {
    return home.request({
        url: '/api/v1/group/exit/' + id,
        method: 'GET'
    })
}

// 团体报名 /Gokart/team  enroll
export function teamEnroll(data) {
    return enroll.request({
        url: '/Gokart/team',
        method: 'POST',
		data: data
    })
}