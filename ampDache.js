/*
高德打车签到
仅QX测试，其他自测
获取Cookie等信息方法 ，QX开重写，进入【高德地图，打车，福利中心】,如果没提醒，重新打开APP重新进入

自动签到 地图APP/微信小程序、支付宝小程序
由于不懂JS，代码是硬堆的，也不知道怎么弄，好在能跑起来，有懂的大佬可以帮优化下流程

======调试区|忽略======
# ^https:\/\/m5(-zb)?\.amap\.com\/ws\/yuece\/(act|openapi)\/(activity\/current\/)?query url script-response-body http://192.168.2.170:8080/ampDache.js
# https://m5-zb.amap.com/ws/yuece/act/query?  
# https://m5.amap.com/ws/yuece/act/query?
# https://m5.amap.com/ws/yuece/openapi/activity/current/query
======调试区|忽略======

====================================
[rewrite_local]
^https:\/\/m5(-zb)?\.amap\.com\/ws\/yuece\/(act|openapi)\/(activity\/current\/)?query url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/task/ampDache.js

[task_local]
1 0 * * * https://raw.githubusercontent.com/wf021325/qx/master/task/ampDache.js, tag=高德地图打车签到, enabled=true

[mitm]
hostname = *.amap.com
====================================
 */
//************RSA
var RSA = {};
!(function (exports) {
	var window = {},
		navigator = {},
		dbits;
	Array.prototype.forEach ||
		(Array.prototype.forEach = function (t, e) {
			var i, r;
			if (null == this) throw new TypeError(' this is null or not defined');
			var n = Object(this),
				s = n.length >>> 0;
			if ('function' != typeof t) throw new TypeError(t + ' is not a function');
			for (arguments.length > 1 && (i = e), r = 0; r < s; ) {
				var o;
				r in n && ((o = n[r]), t.call(i, o, r, n)), r++;
			}
		});
	var canary = 0xdeadbeefcafe,
		j_lm = 15715070 == (16777215 & canary);
	function BigInteger(t, e, i) {
		null != t && ('number' == typeof t ? this.fromNumber(t, e, i) : null == e && 'string' != typeof t ? this.fromString(t, 256) : this.fromString(t, e));
	}
	function nbi() {
		return new BigInteger(null);
	}
	function am1(t, e, i, r, n, s) {
		for (; --s >= 0; ) {
			var o = e * this[t++] + i[r] + n;
			(n = Math.floor(o / 67108864)), (i[r++] = 67108863 & o);
		}
		return n;
	}
	function am2(t, e, i, r, n, s) {
		for (var o = 32767 & e, h = e >> 15; --s >= 0; ) {
			var a = 32767 & this[t],
				u = this[t++] >> 15,
				p = h * a + u * o;
			(n = ((a = o * a + ((32767 & p) << 15) + i[r] + (1073741823 & n)) >>> 30) + (p >>> 15) + h * u + (n >>> 30)), (i[r++] = 1073741823 & a);
		}
		return n;
	}
	function am3(t, e, i, r, n, s) {
		for (var o = 16383 & e, h = e >> 14; --s >= 0; ) {
			var a = 16383 & this[t],
				u = this[t++] >> 14,
				p = h * a + u * o;
			(n = ((a = o * a + ((16383 & p) << 14) + i[r] + n) >> 28) + (p >> 14) + h * u), (i[r++] = 268435455 & a);
		}
		return n;
	}
	j_lm && 'Microsoft Internet Explorer' == navigator.appName
		? ((BigInteger.prototype.am = am2), (dbits = 30))
		: j_lm && 'Netscape' != navigator.appName
		? ((BigInteger.prototype.am = am1), (dbits = 26))
		: ((BigInteger.prototype.am = am3), (dbits = 28)),
		(BigInteger.prototype.DB = dbits),
		(BigInteger.prototype.DM = (1 << dbits) - 1),
		(BigInteger.prototype.DV = 1 << dbits);
	var BI_FP = 52;
	(BigInteger.prototype.FV = Math.pow(2, BI_FP)), (BigInteger.prototype.F1 = BI_FP - dbits), (BigInteger.prototype.F2 = 2 * dbits - BI_FP);
	var BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz',
		BI_RC = new Array(),
		rr,
		vv;
	for (rr = '0'.charCodeAt(0), vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
	for (rr = 'a'.charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
	for (rr = 'A'.charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
	function int2char(t) {
		return BI_RM.charAt(t);
	}
	function intAt(t, e) {
		var i = BI_RC[t.charCodeAt(e)];
		return null == i ? -1 : i;
	}
	function bnpCopyTo(t) {
		for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
		(t.t = this.t), (t.s = this.s);
	}
	function bnpFromInt(t) {
		(this.t = 1), (this.s = t < 0 ? -1 : 0), t > 0 ? (this[0] = t) : t < -1 ? (this[0] = t + this.DV) : (this.t = 0);
	}
	function nbv(t) {
		var e = nbi();
		return e.fromInt(t), e;
	}
	function bnpFromString(t, e) {
		var i;
		if (16 == e) i = 4;
		else if (8 == e) i = 3;
		else if (256 == e) i = 8;
		else if (2 == e) i = 1;
		else if (32 == e) i = 5;
		else {
			if (4 != e) return void this.fromRadix(t, e);
			i = 2;
		}
		(this.t = 0), (this.s = 0);
		for (var r = t.length, n = !1, s = 0; --r >= 0; ) {
			var o = 8 == i ? 255 & t[r] : intAt(t, r);
			o < 0
				? '-' == t.charAt(r) && (n = !0)
				: ((n = !1),
				  0 == s
						? (this[this.t++] = o)
						: s + i > this.DB
						? ((this[this.t - 1] |= (o & ((1 << (this.DB - s)) - 1)) << s), (this[this.t++] = o >> (this.DB - s)))
						: (this[this.t - 1] |= o << s),
				  (s += i) >= this.DB && (s -= this.DB));
		}
		8 == i && 0 != (128 & t[0]) && ((this.s = -1), s > 0 && (this[this.t - 1] |= ((1 << (this.DB - s)) - 1) << s)), this.clamp(), n && BigInteger.ZERO.subTo(this, this);
	}
	function bnpClamp() {
		for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; ) --this.t;
	}
	function bnToString(t) {
		if (this.s < 0) return '-' + this.negate().toString(t);
		var e;
		if (16 == t) e = 4;
		else if (8 == t) e = 3;
		else if (2 == t) e = 1;
		else if (32 == t) e = 5;
		else {
			if (4 != t) return this.toRadix(t);
			e = 2;
		}
		var i,
			r = (1 << e) - 1,
			n = !1,
			s = '',
			o = this.t,
			h = this.DB - ((o * this.DB) % e);
		if (o-- > 0)
			for (h < this.DB && (i = this[o] >> h) > 0 && ((n = !0), (s = int2char(i))); o >= 0; )
				h < e ? ((i = (this[o] & ((1 << h) - 1)) << (e - h)), (i |= this[--o] >> (h += this.DB - e))) : ((i = (this[o] >> (h -= e)) & r), h <= 0 && ((h += this.DB), --o)),
					i > 0 && (n = !0),
					n && (s += int2char(i));
		return n ? s : '0';
	}
	function bnNegate() {
		var t = nbi();
		return BigInteger.ZERO.subTo(this, t), t;
	}
	function bnAbs() {
		return this.s < 0 ? this.negate() : this;
	}
	function bnCompareTo(t) {
		var e = this.s - t.s;
		if (0 != e) return e;
		var i = this.t;
		if (0 != (e = i - t.t)) return this.s < 0 ? -e : e;
		for (; --i >= 0; ) if (0 != (e = this[i] - t[i])) return e;
		return 0;
	}
	function nbits(t) {
		var e,
			i = 1;
		return (
			0 != (e = t >>> 16) && ((t = e), (i += 16)),
			0 != (e = t >> 8) && ((t = e), (i += 8)),
			0 != (e = t >> 4) && ((t = e), (i += 4)),
			0 != (e = t >> 2) && ((t = e), (i += 2)),
			0 != (e = t >> 1) && ((t = e), (i += 1)),
			i
		);
	}
	function bnBitLength() {
		return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
	}
	function bnpDLShiftTo(t, e) {
		var i;
		for (i = this.t - 1; i >= 0; --i) e[i + t] = this[i];
		for (i = t - 1; i >= 0; --i) e[i] = 0;
		(e.t = this.t + t), (e.s = this.s);
	}
	function bnpDRShiftTo(t, e) {
		for (var i = t; i < this.t; ++i) e[i - t] = this[i];
		(e.t = Math.max(this.t - t, 0)), (e.s = this.s);
	}
	function bnpLShiftTo(t, e) {
		var i,
			r = t % this.DB,
			n = this.DB - r,
			s = (1 << n) - 1,
			o = Math.floor(t / this.DB),
			h = (this.s << r) & this.DM;
		for (i = this.t - 1; i >= 0; --i) (e[i + o + 1] = (this[i] >> n) | h), (h = (this[i] & s) << r);
		for (i = o - 1; i >= 0; --i) e[i] = 0;
		(e[o] = h), (e.t = this.t + o + 1), (e.s = this.s), e.clamp();
	}
	function bnpRShiftTo(t, e) {
		e.s = this.s;
		var i = Math.floor(t / this.DB);
		if (i >= this.t) e.t = 0;
		else {
			var r = t % this.DB,
				n = this.DB - r,
				s = (1 << r) - 1;
			e[0] = this[i] >> r;
			for (var o = i + 1; o < this.t; ++o) (e[o - i - 1] |= (this[o] & s) << n), (e[o - i] = this[o] >> r);
			r > 0 && (e[this.t - i - 1] |= (this.s & s) << n), (e.t = this.t - i), e.clamp();
		}
	}
	function bnpSubTo(t, e) {
		for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n; ) (r += this[i] - t[i]), (e[i++] = r & this.DM), (r >>= this.DB);
		if (t.t < this.t) {
			for (r -= t.s; i < this.t; ) (r += this[i]), (e[i++] = r & this.DM), (r >>= this.DB);
			r += this.s;
		} else {
			for (r += this.s; i < t.t; ) (r -= t[i]), (e[i++] = r & this.DM), (r >>= this.DB);
			r -= t.s;
		}
		(e.s = r < 0 ? -1 : 0), r < -1 ? (e[i++] = this.DV + r) : r > 0 && (e[i++] = r), (e.t = i), e.clamp();
	}
	function bnpMultiplyTo(t, e) {
		var i = this.abs(),
			r = t.abs(),
			n = i.t;
		for (e.t = n + r.t; --n >= 0; ) e[n] = 0;
		for (n = 0; n < r.t; ++n) e[n + i.t] = i.am(0, r[n], e, n, 0, i.t);
		(e.s = 0), e.clamp(), this.s != t.s && BigInteger.ZERO.subTo(e, e);
	}
	function bnpSquareTo(t) {
		for (var e = this.abs(), i = (t.t = 2 * e.t); --i >= 0; ) t[i] = 0;
		for (i = 0; i < e.t - 1; ++i) {
			var r = e.am(i, e[i], t, 2 * i, 0, 1);
			(t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && ((t[i + e.t] -= e.DV), (t[i + e.t + 1] = 1));
		}
		t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)), (t.s = 0), t.clamp();
	}
	function bnpDivRemTo(t, e, i) {
		var r = t.abs();
		if (!(r.t <= 0)) {
			var n = this.abs();
			if (n.t < r.t) return null != e && e.fromInt(0), void (null != i && this.copyTo(i));
			null == i && (i = nbi());
			var s = nbi(),
				o = this.s,
				h = t.s,
				a = this.DB - nbits(r[r.t - 1]);
			a > 0 ? (r.lShiftTo(a, s), n.lShiftTo(a, i)) : (r.copyTo(s), n.copyTo(i));
			var u = s.t,
				p = s[u - 1];
			if (0 != p) {
				var c = p * (1 << this.F1) + (u > 1 ? s[u - 2] >> this.F2 : 0),
					g = this.FV / c,
					l = (1 << this.F1) / c,
					f = 1 << this.F2,
					d = i.t,
					b = d - u,
					v = null == e ? nbi() : e;
				for (s.dlShiftTo(b, v), i.compareTo(v) >= 0 && ((i[i.t++] = 1), i.subTo(v, i)), BigInteger.ONE.dlShiftTo(u, v), v.subTo(s, s); s.t < u; ) s[s.t++] = 0;
				for (; --b >= 0; ) {
					var y = i[--d] == p ? this.DM : Math.floor(i[d] * g + (i[d - 1] + f) * l);
					if ((i[d] += s.am(0, y, i, b, 0, u)) < y) for (s.dlShiftTo(b, v), i.subTo(v, i); i[d] < --y; ) i.subTo(v, i);
				}
				null != e && (i.drShiftTo(u, e), o != h && BigInteger.ZERO.subTo(e, e)), (i.t = u), i.clamp(), a > 0 && i.rShiftTo(a, i), o < 0 && BigInteger.ZERO.subTo(i, i);
			}
		}
	}
	function bnMod(t) {
		var e = nbi();
		return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(BigInteger.ZERO) > 0 && t.subTo(e, e), e;
	}
	function Classic(t) {
		this.m = t;
	}
	function cConvert(t) {
		return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
	}
	function cRevert(t) {
		return t;
	}
	function cReduce(t) {
		t.divRemTo(this.m, null, t);
	}
	function cMulTo(t, e, i) {
		t.multiplyTo(e, i), this.reduce(i);
	}
	function cSqrTo(t, e) {
		t.squareTo(e), this.reduce(e);
	}
	function bnpInvDigit() {
		if (this.t < 1) return 0;
		var t = this[0];
		if (0 == (1 & t)) return 0;
		var e = 3 & t;
		return (e =
			((e = ((e = ((e = (e * (2 - (15 & t) * e)) & 15) * (2 - (255 & t) * e)) & 255) * (2 - (((65535 & t) * e) & 65535))) & 65535) * (2 - ((t * e) % this.DV))) % this.DV) > 0
			? this.DV - e
			: -e;
	}
	function Montgomery(t) {
		(this.m = t), (this.mp = t.invDigit()), (this.mpl = 32767 & this.mp), (this.mph = this.mp >> 15), (this.um = (1 << (t.DB - 15)) - 1), (this.mt2 = 2 * t.t);
	}
	function montConvert(t) {
		var e = nbi();
		return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(e, e), e;
	}
	function montRevert(t) {
		var e = nbi();
		return t.copyTo(e), this.reduce(e), e;
	}
	function montReduce(t) {
		for (; t.t <= this.mt2; ) t[t.t++] = 0;
		for (var e = 0; e < this.m.t; ++e) {
			var i = 32767 & t[e],
				r = (i * this.mpl + (((i * this.mph + (t[e] >> 15) * this.mpl) & this.um) << 15)) & t.DM;
			for (t[(i = e + this.m.t)] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV; ) (t[i] -= t.DV), t[++i]++;
		}
		t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
	}
	function montSqrTo(t, e) {
		t.squareTo(e), this.reduce(e);
	}
	function montMulTo(t, e, i) {
		t.multiplyTo(e, i), this.reduce(i);
	}
	function bnpIsEven() {
		return 0 == (this.t > 0 ? 1 & this[0] : this.s);
	}
	function bnpExp(t, e) {
		if (t > 4294967295 || t < 1) return BigInteger.ONE;
		var i = nbi(),
			r = nbi(),
			n = e.convert(this),
			s = nbits(t) - 1;
		for (n.copyTo(i); --s >= 0; )
			if ((e.sqrTo(i, r), (t & (1 << s)) > 0)) e.mulTo(r, n, i);
			else {
				var o = i;
				(i = r), (r = o);
			}
		return e.revert(i);
	}
	function bnModPowInt(t, e) {
		var i;
		return (i = t < 256 || e.isEven() ? new Classic(e) : new Montgomery(e)), this.exp(t, i);
	}
	function bnClone() {
		var t = nbi();
		return this.copyTo(t), t;
	}
	function bnIntValue() {
		if (this.s < 0) {
			if (1 == this.t) return this[0] - this.DV;
			if (0 == this.t) return -1;
		} else {
			if (1 == this.t) return this[0];
			if (0 == this.t) return 0;
		}
		return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
	}
	function bnByteValue() {
		return 0 == this.t ? this.s : (this[0] << 24) >> 24;
	}
	function bnShortValue() {
		return 0 == this.t ? this.s : (this[0] << 16) >> 16;
	}
	function bnpChunkSize(t) {
		return Math.floor((Math.LN2 * this.DB) / Math.log(t));
	}
	function bnSigNum() {
		return this.s < 0 ? -1 : this.t <= 0 || (1 == this.t && this[0] <= 0) ? 0 : 1;
	}
	function bnpToRadix(t) {
		if ((null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36)) return '0';
		var e = this.chunkSize(t),
			i = Math.pow(t, e),
			r = nbv(i),
			n = nbi(),
			s = nbi(),
			o = '';
		for (this.divRemTo(r, n, s); n.signum() > 0; ) (o = (i + s.intValue()).toString(t).substr(1) + o), n.divRemTo(r, n, s);
		return s.intValue().toString(t) + o;
	}
	function bnpFromRadix(t, e) {
		this.fromInt(0), null == e && (e = 10);
		for (var i = this.chunkSize(e), r = Math.pow(e, i), n = !1, s = 0, o = 0, h = 0; h < t.length; ++h) {
			var a = intAt(t, h);
			a < 0 ? '-' == t.charAt(h) && 0 == this.signum() && (n = !0) : ((o = e * o + a), ++s >= i && (this.dMultiply(r), this.dAddOffset(o, 0), (s = 0), (o = 0)));
		}
		s > 0 && (this.dMultiply(Math.pow(e, s)), this.dAddOffset(o, 0)), n && BigInteger.ZERO.subTo(this, this);
	}
	function bnpFromNumber(t, e, i) {
		if ('number' == typeof e)
			if (t < 2) this.fromInt(1);
			else
				for (
					this.fromNumber(t, i), this.testBit(t - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(t - 1), op_or, this), this.isEven() && this.dAddOffset(1, 0);
					!this.isProbablePrime(e);

				)
					this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(BigInteger.ONE.shiftLeft(t - 1), this);
		else {
			var r = new Array(),
				n = 7 & t;
			(r.length = 1 + (t >> 3)), e.nextBytes(r), n > 0 ? (r[0] &= (1 << n) - 1) : (r[0] = 0), this.fromString(r, 256);
		}
	}
	function bnToByteArray() {
		var t = this.t,
			e = new Array();
		e[0] = this.s;
		var i,
			r = this.DB - ((t * this.DB) % 8),
			n = 0;
		if (t-- > 0)
			for (r < this.DB && (i = this[t] >> r) != (this.s & this.DM) >> r && (e[n++] = i | (this.s << (this.DB - r))); t >= 0; )
				r < 8
					? ((i = (this[t] & ((1 << r) - 1)) << (8 - r)), (i |= this[--t] >> (r += this.DB - 8)))
					: ((i = (this[t] >> (r -= 8)) & 255), r <= 0 && ((r += this.DB), --t)),
					0 != (128 & i) && (i |= -256),
					0 == n && (128 & this.s) != (128 & i) && ++n,
					(n > 0 || i != this.s) && (e[n++] = i);
		return e;
	}
	function bnEquals(t) {
		return 0 == this.compareTo(t);
	}
	function bnMin(t) {
		return this.compareTo(t) < 0 ? this : t;
	}
	function bnMax(t) {
		return this.compareTo(t) > 0 ? this : t;
	}
	function bnpBitwiseTo(t, e, i) {
		var r,
			n,
			s = Math.min(t.t, this.t);
		for (r = 0; r < s; ++r) i[r] = e(this[r], t[r]);
		if (t.t < this.t) {
			for (n = t.s & this.DM, r = s; r < this.t; ++r) i[r] = e(this[r], n);
			i.t = this.t;
		} else {
			for (n = this.s & this.DM, r = s; r < t.t; ++r) i[r] = e(n, t[r]);
			i.t = t.t;
		}
		(i.s = e(this.s, t.s)), i.clamp();
	}
	function op_and(t, e) {
		return t & e;
	}
	function bnAnd(t) {
		var e = nbi();
		return this.bitwiseTo(t, op_and, e), e;
	}
	function op_or(t, e) {
		return t | e;
	}
	function bnOr(t) {
		var e = nbi();
		return this.bitwiseTo(t, op_or, e), e;
	}
	function op_xor(t, e) {
		return t ^ e;
	}
	function bnXor(t) {
		var e = nbi();
		return this.bitwiseTo(t, op_xor, e), e;
	}
	function op_andnot(t, e) {
		return t & ~e;
	}
	function bnAndNot(t) {
		var e = nbi();
		return this.bitwiseTo(t, op_andnot, e), e;
	}
	function bnNot() {
		for (var t = nbi(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
		return (t.t = this.t), (t.s = ~this.s), t;
	}
	function bnShiftLeft(t) {
		var e = nbi();
		return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e;
	}
	function bnShiftRight(t) {
		var e = nbi();
		return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e;
	}
	function lbit(t) {
		if (0 == t) return -1;
		var e = 0;
		return (
			0 == (65535 & t) && ((t >>= 16), (e += 16)),
			0 == (255 & t) && ((t >>= 8), (e += 8)),
			0 == (15 & t) && ((t >>= 4), (e += 4)),
			0 == (3 & t) && ((t >>= 2), (e += 2)),
			0 == (1 & t) && ++e,
			e
		);
	}
	function bnGetLowestSetBit() {
		for (var t = 0; t < this.t; ++t) if (0 != this[t]) return t * this.DB + lbit(this[t]);
		return this.s < 0 ? this.t * this.DB : -1;
	}
	function cbit(t) {
		for (var e = 0; 0 != t; ) (t &= t - 1), ++e;
		return e;
	}
	function bnBitCount() {
		for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i) t += cbit(this[i] ^ e);
		return t;
	}
	function bnTestBit(t) {
		var e = Math.floor(t / this.DB);
		return e >= this.t ? 0 != this.s : 0 != (this[e] & (1 << t % this.DB));
	}
	function bnpChangeBit(t, e) {
		var i = BigInteger.ONE.shiftLeft(t);
		return this.bitwiseTo(i, e, i), i;
	}
	function bnSetBit(t) {
		return this.changeBit(t, op_or);
	}
	function bnClearBit(t) {
		return this.changeBit(t, op_andnot);
	}
	function bnFlipBit(t) {
		return this.changeBit(t, op_xor);
	}
	function bnpAddTo(t, e) {
		for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n; ) (r += this[i] + t[i]), (e[i++] = r & this.DM), (r >>= this.DB);
		if (t.t < this.t) {
			for (r += t.s; i < this.t; ) (r += this[i]), (e[i++] = r & this.DM), (r >>= this.DB);
			r += this.s;
		} else {
			for (r += this.s; i < t.t; ) (r += t[i]), (e[i++] = r & this.DM), (r >>= this.DB);
			r += t.s;
		}
		(e.s = r < 0 ? -1 : 0), r > 0 ? (e[i++] = r) : r < -1 && (e[i++] = this.DV + r), (e.t = i), e.clamp();
	}
	function bnAdd(t) {
		var e = nbi();
		return this.addTo(t, e), e;
	}
	function bnSubtract(t) {
		var e = nbi();
		return this.subTo(t, e), e;
	}
	function bnMultiply(t) {
		var e = nbi();
		return this.multiplyTo(t, e), e;
	}
	function bnSquare() {
		var t = nbi();
		return this.squareTo(t), t;
	}
	function bnDivide(t) {
		var e = nbi();
		return this.divRemTo(t, e, null), e;
	}
	function bnRemainder(t) {
		var e = nbi();
		return this.divRemTo(t, null, e), e;
	}
	function bnDivideAndRemainder(t) {
		var e = nbi(),
			i = nbi();
		return this.divRemTo(t, e, i), new Array(e, i);
	}
	function bnpDMultiply(t) {
		(this[this.t] = this.am(0, t - 1, this, 0, 0, this.t)), ++this.t, this.clamp();
	}
	function bnpDAddOffset(t, e) {
		if (0 != t) {
			for (; this.t <= e; ) this[this.t++] = 0;
			for (this[e] += t; this[e] >= this.DV; ) (this[e] -= this.DV), ++e >= this.t && (this[this.t++] = 0), ++this[e];
		}
	}
	function NullExp() {}
	function nNop(t) {
		return t;
	}
	function nMulTo(t, e, i) {
		t.multiplyTo(e, i);
	}
	function nSqrTo(t, e) {
		t.squareTo(e);
	}
	function bnPow(t) {
		return this.exp(t, new NullExp());
	}
	function bnpMultiplyLowerTo(t, e, i) {
		var r,
			n = Math.min(this.t + t.t, e);
		for (i.s = 0, i.t = n; n > 0; ) i[--n] = 0;
		for (r = i.t - this.t; n < r; ++n) i[n + this.t] = this.am(0, t[n], i, n, 0, this.t);
		for (r = Math.min(t.t, e); n < r; ++n) this.am(0, t[n], i, n, 0, e - n);
		i.clamp();
	}
	function bnpMultiplyUpperTo(t, e, i) {
		--e;
		var r = (i.t = this.t + t.t - e);
		for (i.s = 0; --r >= 0; ) i[r] = 0;
		for (r = Math.max(e - this.t, 0); r < t.t; ++r) i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);
		i.clamp(), i.drShiftTo(1, i);
	}
	function Barrett(t) {
		(this.r2 = nbi()), (this.q3 = nbi()), BigInteger.ONE.dlShiftTo(2 * t.t, this.r2), (this.mu = this.r2.divide(t)), (this.m = t);
	}
	function barrettConvert(t) {
		if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
		if (t.compareTo(this.m) < 0) return t;
		var e = nbi();
		return t.copyTo(e), this.reduce(e), e;
	}
	function barrettRevert(t) {
		return t;
	}
	function barrettReduce(t) {
		for (
			t.drShiftTo(this.m.t - 1, this.r2),
				t.t > this.m.t + 1 && ((t.t = this.m.t + 1), t.clamp()),
				this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
				this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
			t.compareTo(this.r2) < 0;

		)
			t.dAddOffset(1, this.m.t + 1);
		for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; ) t.subTo(this.m, t);
	}
	function barrettSqrTo(t, e) {
		t.squareTo(e), this.reduce(e);
	}
	function barrettMulTo(t, e, i) {
		t.multiplyTo(e, i), this.reduce(i);
	}
	function bnModPow(t, e) {
		var i,
			r,
			n = t.bitLength(),
			s = nbv(1);
		if (n <= 0) return s;
		(i = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6), (r = n < 8 ? new Classic(e) : e.isEven() ? new Barrett(e) : new Montgomery(e));
		var o = new Array(),
			h = 3,
			a = i - 1,
			u = (1 << i) - 1;
		if (((o[1] = r.convert(this)), i > 1)) {
			var p = nbi();
			for (r.sqrTo(o[1], p); h <= u; ) (o[h] = nbi()), r.mulTo(p, o[h - 2], o[h]), (h += 2);
		}
		var c,
			g,
			l = t.t - 1,
			f = !0,
			d = nbi();
		for (n = nbits(t[l]) - 1; l >= 0; ) {
			for (n >= a ? (c = (t[l] >> (n - a)) & u) : ((c = (t[l] & ((1 << (n + 1)) - 1)) << (a - n)), l > 0 && (c |= t[l - 1] >> (this.DB + n - a))), h = i; 0 == (1 & c); )
				(c >>= 1), --h;
			if (((n -= h) < 0 && ((n += this.DB), --l), f)) o[c].copyTo(s), (f = !1);
			else {
				for (; h > 1; ) r.sqrTo(s, d), r.sqrTo(d, s), (h -= 2);
				h > 0 ? r.sqrTo(s, d) : ((g = s), (s = d), (d = g)), r.mulTo(d, o[c], s);
			}
			for (; l >= 0 && 0 == (t[l] & (1 << n)); ) r.sqrTo(s, d), (g = s), (s = d), (d = g), --n < 0 && ((n = this.DB - 1), --l);
		}
		return r.revert(s);
	}
	function bnGCD(t) {
		var e = this.s < 0 ? this.negate() : this.clone(),
			i = t.s < 0 ? t.negate() : t.clone();
		if (e.compareTo(i) < 0) {
			var r = e;
			(e = i), (i = r);
		}
		var n = e.getLowestSetBit(),
			s = i.getLowestSetBit();
		if (s < 0) return e;
		for (n < s && (s = n), s > 0 && (e.rShiftTo(s, e), i.rShiftTo(s, i)); e.signum() > 0; )
			(n = e.getLowestSetBit()) > 0 && e.rShiftTo(n, e),
				(n = i.getLowestSetBit()) > 0 && i.rShiftTo(n, i),
				e.compareTo(i) >= 0 ? (e.subTo(i, e), e.rShiftTo(1, e)) : (i.subTo(e, i), i.rShiftTo(1, i));
		return s > 0 && i.lShiftTo(s, i), i;
	}
	function bnpModInt(t) {
		if (t <= 0) return 0;
		var e = this.DV % t,
			i = this.s < 0 ? t - 1 : 0;
		if (this.t > 0)
			if (0 == e) i = this[0] % t;
			else for (var r = this.t - 1; r >= 0; --r) i = (e * i + this[r]) % t;
		return i;
	}
	function bnModInverse(t) {
		var e = t.isEven();
		if ((this.isEven() && e) || 0 == t.signum()) return BigInteger.ZERO;
		for (var i = t.clone(), r = this.clone(), n = nbv(1), s = nbv(0), o = nbv(0), h = nbv(1); 0 != i.signum(); ) {
			for (; i.isEven(); )
				i.rShiftTo(1, i), e ? ((n.isEven() && s.isEven()) || (n.addTo(this, n), s.subTo(t, s)), n.rShiftTo(1, n)) : s.isEven() || s.subTo(t, s), s.rShiftTo(1, s);
			for (; r.isEven(); )
				r.rShiftTo(1, r), e ? ((o.isEven() && h.isEven()) || (o.addTo(this, o), h.subTo(t, h)), o.rShiftTo(1, o)) : h.isEven() || h.subTo(t, h), h.rShiftTo(1, h);
			i.compareTo(r) >= 0 ? (i.subTo(r, i), e && n.subTo(o, n), s.subTo(h, s)) : (r.subTo(i, r), e && o.subTo(n, o), h.subTo(s, h));
		}
		return 0 != r.compareTo(BigInteger.ONE) ? BigInteger.ZERO : h.compareTo(t) >= 0 ? h.subtract(t) : h.signum() < 0 ? (h.addTo(t, h), h.signum() < 0 ? h.add(t) : h) : h;
	}
	(Classic.prototype.convert = cConvert),
		(Classic.prototype.revert = cRevert),
		(Classic.prototype.reduce = cReduce),
		(Classic.prototype.mulTo = cMulTo),
		(Classic.prototype.sqrTo = cSqrTo),
		(Montgomery.prototype.convert = montConvert),
		(Montgomery.prototype.revert = montRevert),
		(Montgomery.prototype.reduce = montReduce),
		(Montgomery.prototype.mulTo = montMulTo),
		(Montgomery.prototype.sqrTo = montSqrTo),
		(BigInteger.prototype.copyTo = bnpCopyTo),
		(BigInteger.prototype.fromInt = bnpFromInt),
		(BigInteger.prototype.fromString = bnpFromString),
		(BigInteger.prototype.clamp = bnpClamp),
		(BigInteger.prototype.dlShiftTo = bnpDLShiftTo),
		(BigInteger.prototype.drShiftTo = bnpDRShiftTo),
		(BigInteger.prototype.lShiftTo = bnpLShiftTo),
		(BigInteger.prototype.rShiftTo = bnpRShiftTo),
		(BigInteger.prototype.subTo = bnpSubTo),
		(BigInteger.prototype.multiplyTo = bnpMultiplyTo),
		(BigInteger.prototype.squareTo = bnpSquareTo),
		(BigInteger.prototype.divRemTo = bnpDivRemTo),
		(BigInteger.prototype.invDigit = bnpInvDigit),
		(BigInteger.prototype.isEven = bnpIsEven),
		(BigInteger.prototype.exp = bnpExp),
		(BigInteger.prototype.toString = bnToString),
		(BigInteger.prototype.negate = bnNegate),
		(BigInteger.prototype.abs = bnAbs),
		(BigInteger.prototype.compareTo = bnCompareTo),
		(BigInteger.prototype.bitLength = bnBitLength),
		(BigInteger.prototype.mod = bnMod),
		(BigInteger.prototype.modPowInt = bnModPowInt),
		(BigInteger.ZERO = nbv(0)),
		(BigInteger.ONE = nbv(1)),
		(NullExp.prototype.convert = nNop),
		(NullExp.prototype.revert = nNop),
		(NullExp.prototype.mulTo = nMulTo),
		(NullExp.prototype.sqrTo = nSqrTo),
		(Barrett.prototype.convert = barrettConvert),
		(Barrett.prototype.revert = barrettRevert),
		(Barrett.prototype.reduce = barrettReduce),
		(Barrett.prototype.mulTo = barrettMulTo),
		(Barrett.prototype.sqrTo = barrettSqrTo);
	var lowprimes = [
			2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167,
			173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359,
			367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571,
			577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787,
			797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
		],
		lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
	function bnIsProbablePrime(t) {
		var e,
			i = this.abs();
		if (1 == i.t && i[0] <= lowprimes[lowprimes.length - 1]) {
			for (e = 0; e < lowprimes.length; ++e) if (i[0] == lowprimes[e]) return !0;
			return !1;
		}
		if (i.isEven()) return !1;
		for (e = 1; e < lowprimes.length; ) {
			for (var r = lowprimes[e], n = e + 1; n < lowprimes.length && r < lplim; ) r *= lowprimes[n++];
			for (r = i.modInt(r); e < n; ) if (r % lowprimes[e++] == 0) return !1;
		}
		return i.millerRabin(t);
	}
	function bnpMillerRabin(t) {
		var e = this.subtract(BigInteger.ONE),
			i = e.getLowestSetBit();
		if (i <= 0) return !1;
		var r = e.shiftRight(i);
		(t = (t + 1) >> 1) > lowprimes.length && (t = lowprimes.length);
		for (var n = nbi(), s = 0; s < t; ++s) {
			n.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
			var o = n.modPow(r, this);
			if (0 != o.compareTo(BigInteger.ONE) && 0 != o.compareTo(e)) {
				for (var h = 1; h++ < i && 0 != o.compareTo(e); ) if (0 == (o = o.modPowInt(2, this)).compareTo(BigInteger.ONE)) return !1;
				if (0 != o.compareTo(e)) return !1;
			}
		}
		return !0;
	}
	function Arcfour() {
		(this.i = 0), (this.j = 0), (this.S = new Array());
	}
	function ARC4init(t) {
		var e, i, r;
		for (e = 0; e < 256; ++e) this.S[e] = e;
		for (i = 0, e = 0; e < 256; ++e) (i = (i + this.S[e] + t[e % t.length]) & 255), (r = this.S[e]), (this.S[e] = this.S[i]), (this.S[i] = r);
		(this.i = 0), (this.j = 0);
	}
	function ARC4next() {
		var t;
		return (
			(this.i = (this.i + 1) & 255),
			(this.j = (this.j + this.S[this.i]) & 255),
			(t = this.S[this.i]),
			(this.S[this.i] = this.S[this.j]),
			(this.S[this.j] = t),
			this.S[(t + this.S[this.i]) & 255]
		);
	}
	function prng_newstate() {
		return new Arcfour();
	}
	(BigInteger.prototype.chunkSize = bnpChunkSize),
		(BigInteger.prototype.toRadix = bnpToRadix),
		(BigInteger.prototype.fromRadix = bnpFromRadix),
		(BigInteger.prototype.fromNumber = bnpFromNumber),
		(BigInteger.prototype.bitwiseTo = bnpBitwiseTo),
		(BigInteger.prototype.changeBit = bnpChangeBit),
		(BigInteger.prototype.addTo = bnpAddTo),
		(BigInteger.prototype.dMultiply = bnpDMultiply),
		(BigInteger.prototype.dAddOffset = bnpDAddOffset),
		(BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo),
		(BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo),
		(BigInteger.prototype.modInt = bnpModInt),
		(BigInteger.prototype.millerRabin = bnpMillerRabin),
		(BigInteger.prototype.clone = bnClone),
		(BigInteger.prototype.intValue = bnIntValue),
		(BigInteger.prototype.byteValue = bnByteValue),
		(BigInteger.prototype.shortValue = bnShortValue),
		(BigInteger.prototype.signum = bnSigNum),
		(BigInteger.prototype.toByteArray = bnToByteArray),
		(BigInteger.prototype.equals = bnEquals),
		(BigInteger.prototype.min = bnMin),
		(BigInteger.prototype.max = bnMax),
		(BigInteger.prototype.and = bnAnd),
		(BigInteger.prototype.or = bnOr),
		(BigInteger.prototype.xor = bnXor),
		(BigInteger.prototype.andNot = bnAndNot),
		(BigInteger.prototype.not = bnNot),
		(BigInteger.prototype.shiftLeft = bnShiftLeft),
		(BigInteger.prototype.shiftRight = bnShiftRight),
		(BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit),
		(BigInteger.prototype.bitCount = bnBitCount),
		(BigInteger.prototype.testBit = bnTestBit),
		(BigInteger.prototype.setBit = bnSetBit),
		(BigInteger.prototype.clearBit = bnClearBit),
		(BigInteger.prototype.flipBit = bnFlipBit),
		(BigInteger.prototype.add = bnAdd),
		(BigInteger.prototype.subtract = bnSubtract),
		(BigInteger.prototype.multiply = bnMultiply),
		(BigInteger.prototype.divide = bnDivide),
		(BigInteger.prototype.remainder = bnRemainder),
		(BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder),
		(BigInteger.prototype.modPow = bnModPow),
		(BigInteger.prototype.modInverse = bnModInverse),
		(BigInteger.prototype.pow = bnPow),
		(BigInteger.prototype.gcd = bnGCD),
		(BigInteger.prototype.isProbablePrime = bnIsProbablePrime),
		(BigInteger.prototype.square = bnSquare),
		(Arcfour.prototype.init = ARC4init),
		(Arcfour.prototype.next = ARC4next);
	var rng_psize = 256,
		rng_state,
		rng_pool,
		rng_pptr;
	if (null == rng_pool) {
		var t;
		if (((rng_pool = new Array()), (rng_pptr = 0), window.crypto && window.crypto.getRandomValues)) {
			var z = new Uint32Array(256);
			for (window.crypto.getRandomValues(z), t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = 255 & z[t];
		}
		var onMouseMoveListener = function (t) {
			if (((this.count = this.count || 0), this.count >= 256 || rng_pptr >= rng_psize))
				window.removeEventListener
					? window.removeEventListener('mousemove', onMouseMoveListener, !1)
					: window.detachEvent && window.detachEvent('onmousemove', onMouseMoveListener);
			else
				try {
					var e = t.x + t.y;
					(rng_pool[rng_pptr++] = 255 & e), (this.count += 1);
				} catch (t) {}
		};
		window.addEventListener ? window.addEventListener('mousemove', onMouseMoveListener, !1) : window.attachEvent && window.attachEvent('onmousemove', onMouseMoveListener);
	}
	function rng_get_byte() {
		if (null == rng_state) {
			for (rng_state = prng_newstate(); rng_pptr < rng_psize; ) {
				var t = Math.floor(65536 * Math.random());
				rng_pool[rng_pptr++] = 255 & t;
			}
			for (rng_state.init(rng_pool), rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
			rng_pptr = 0;
		}
		return rng_state.next();
	}
	function rng_get_bytes(t) {
		var e;
		for (e = 0; e < t.length; ++e) t[e] = rng_get_byte();
	}
	function SecureRandom() {}
	function parseBigInt(t, e) {
		return new BigInteger(t, e);
	}
	function linebrk(t, e) {
		for (var i = '', r = 0; r + e < t.length; ) (i += t.substring(r, r + e) + '\n'), (r += e);
		return i + t.substring(r, t.length);
	}
	function byte2Hex(t) {
		return t < 16 ? '0' + t.toString(16) : t.toString(16);
	}
	function pkcs1pad2(t, e, i) {
		if (e < t.length + 11) return console.error('Message too long for RSA'), null;
		for (var r = new Array(), n = t.length - 1; n >= 0 && e > 0; ) {
			var s = t.charCodeAt(n--);
			s < 128
				? (r[--e] = s)
				: s > 127 && s < 2048
				? ((r[--e] = (63 & s) | 128), (r[--e] = (s >> 6) | 192))
				: ((r[--e] = (63 & s) | 128), (r[--e] = ((s >> 6) & 63) | 128), (r[--e] = (s >> 12) | 224));
		}
		if (((r[--e] = 0), 2 == i))
			for (var o = new SecureRandom(), h = new Array(); e > 2; ) {
				for (h[0] = 0; 0 == h[0]; ) o.nextBytes(h);
				r[--e] = h[0];
			}
		else if (0 == i) r[--e] = 0;
		else for (; e > 2; ) r[--e] = 255;
		return (r[--e] = i), (r[--e] = 0), new BigInteger(r);
	}
	function RSAKey() {
		(this.n = null), (this.e = 0), (this.d = null), (this.p = null), (this.q = null), (this.dmp1 = null), (this.dmq1 = null), (this.coeff = null);
	}
	function RSASetPublic(t, e) {
		null != t && null != e && t.length > 0 && e.length > 0 ? ((this.n = parseBigInt(t, 16)), (this.e = parseInt(e, 16))) : console.error('Invalid RSA public key');
	}
	function RSADoPublic(t) {
		return t.modPowInt(this.e, this.n);
	}
	function RSAPublicEncrypt(t, e) {
		var i = pkcs1pad2(t, (this.n.bitLength() + 7) >> 3, e);
		if (null == i) return null;
		var r = this.doPublic(i);
		if (null == r) return null;
		var n = r.toString(16);
		return 0 == (1 & n.length) ? n : '0' + n;
	}
	function RSAPrivateEncrypt(t, e) {
		var i = pkcs1pad2(t, (this.n.bitLength() + 7) >> 3, e);
		if (null == i) return null;
		var r = this.doPrivate(i);
		if (null == r) return null;
		var n = r.toString(16);
		return 0 == (1 & n.length) ? n : '0' + n;
	}
	function pkcs1unpad2(t, e, i) {
		var r = t.toByteArray(),
			n = 0;
		if (0 == i) n = -1;
		else {
			for (; n < r.length && 0 == r[n]; ) ++n;
			if (r.length - n != e - 1 || r[n] != i) return null;
			for (++n; 0 != r[n]; ) if (++n >= r.length) return null;
		}
		for (var s = ''; ++n < r.length; ) {
			var o = 255 & r[n];
			o < 128
				? (s += String.fromCharCode(o))
				: o > 191 && o < 224
				? ((s += String.fromCharCode(((31 & o) << 6) | (63 & r[n + 1]))), ++n)
				: ((s += String.fromCharCode(((15 & o) << 12) | ((63 & r[n + 1]) << 6) | (63 & r[n + 2]))), (n += 2));
		}
		return s;
	}
	function RSASetPrivate(t, e, i) {
		null != t && null != e && t.length > 0 && e.length > 0
			? ((this.n = parseBigInt(t, 16)), (this.e = parseInt(e, 16)), (this.d = parseBigInt(i, 16)))
			: console.error('Invalid RSA private key');
	}
	function RSASetPrivateEx(t, e, i, r, n, s, o, h) {
		null != t && null != e && t.length > 0 && e.length > 0
			? ((this.n = parseBigInt(t, 16)),
			  (this.e = parseInt(e, 16)),
			  (this.d = parseBigInt(i, 16)),
			  (this.p = parseBigInt(r, 16)),
			  (this.q = parseBigInt(n, 16)),
			  (this.dmp1 = parseBigInt(s, 16)),
			  (this.dmq1 = parseBigInt(o, 16)),
			  (this.coeff = parseBigInt(h, 16)))
			: console.error('Invalid RSA private key');
	}
	function RSAGenerate(t, e) {
		var i = new SecureRandom(),
			r = t >> 1;
		this.e = parseInt(e, 16);
		for (var n = new BigInteger(e, 16); ; ) {
			for (; (this.p = new BigInteger(t - r, 1, i)), 0 != this.p.subtract(BigInteger.ONE).gcd(n).compareTo(BigInteger.ONE) || !this.p.isProbablePrime(10); );
			for (; (this.q = new BigInteger(r, 1, i)), 0 != this.q.subtract(BigInteger.ONE).gcd(n).compareTo(BigInteger.ONE) || !this.q.isProbablePrime(10); );
			if (this.p.compareTo(this.q) <= 0) {
				var s = this.p;
				(this.p = this.q), (this.q = s);
			}
			var o = this.p.subtract(BigInteger.ONE),
				h = this.q.subtract(BigInteger.ONE),
				a = o.multiply(h);
			if (0 == a.gcd(n).compareTo(BigInteger.ONE)) {
				(this.n = this.p.multiply(this.q)), (this.d = n.modInverse(a)), (this.dmp1 = this.d.mod(o)), (this.dmq1 = this.d.mod(h)), (this.coeff = this.q.modInverse(this.p));
				break;
			}
		}
	}
	function RSADoPrivate(t) {
		if (null == this.p || null == this.q) return t.modPow(this.d, this.n);
		for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0; ) e = e.add(this.p);
		return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i);
	}
	function RSAPrivateDecrypt(t, e) {
		var i = parseBigInt(t, 16),
			r = this.doPrivate(i);
		return null == r ? null : pkcs1unpad2(r, (this.n.bitLength() + 7) >> 3, e);
	}
	function RSAPublicDecrypt(t, e) {
		var i = parseBigInt(t, 16),
			r = this.doPublic(i);
		return null == r ? null : pkcs1unpad2(r, (this.n.bitLength() + 7) >> 3, e);
	}
	(SecureRandom.prototype.nextBytes = rng_get_bytes),
		(RSAKey.prototype.doPublic = RSADoPublic),
		(RSAKey.prototype.setPublic = RSASetPublic),
		(RSAKey.prototype.encrypt_public = RSAPublicEncrypt),
		(RSAKey.prototype.encrypt_private = RSAPrivateEncrypt),
		(RSAKey.prototype.doPrivate = RSADoPrivate),
		(RSAKey.prototype.setPrivate = RSASetPrivate),
		(RSAKey.prototype.setPrivateEx = RSASetPrivateEx),
		(RSAKey.prototype.generate = RSAGenerate),
		(RSAKey.prototype.decrypt_private = RSAPrivateDecrypt),
		(RSAKey.prototype.decrypt_public = RSAPublicDecrypt),
		(function () {
			RSAKey.prototype.generateAsync = function (t, e, i) {
				var r = new SecureRandom(),
					n = t >> 1;
				this.e = parseInt(e, 16);
				var s = new BigInteger(e, 16),
					o = this,
					h = function () {
						var e = function () {
								if (o.p.compareTo(o.q) <= 0) {
									var t = o.p;
									(o.p = o.q), (o.q = t);
								}
								var e = o.p.subtract(BigInteger.ONE),
									r = o.q.subtract(BigInteger.ONE),
									n = e.multiply(r);
								0 == n.gcd(s).compareTo(BigInteger.ONE)
									? ((o.n = o.p.multiply(o.q)),
									  (o.d = s.modInverse(n)),
									  (o.dmp1 = o.d.mod(e)),
									  (o.dmq1 = o.d.mod(r)),
									  (o.coeff = o.q.modInverse(o.p)),
									  setTimeout(function () {
											i();
									  }, 0))
									: setTimeout(h, 0);
							},
							a = function () {
								(o.q = nbi()),
									o.q.fromNumberAsync(n, 1, r, function () {
										o.q.subtract(BigInteger.ONE).gcda(s, function (t) {
											0 == t.compareTo(BigInteger.ONE) && o.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(a, 0);
										});
									});
							},
							u = function () {
								(o.p = nbi()),
									o.p.fromNumberAsync(t - n, 1, r, function () {
										o.p.subtract(BigInteger.ONE).gcda(s, function (t) {
											0 == t.compareTo(BigInteger.ONE) && o.p.isProbablePrime(10) ? setTimeout(a, 0) : setTimeout(u, 0);
										});
									});
							};
						setTimeout(u, 0);
					};
				setTimeout(h, 0);
			};
			BigInteger.prototype.gcda = function (t, e) {
				var i = this.s < 0 ? this.negate() : this.clone(),
					r = t.s < 0 ? t.negate() : t.clone();
				if (i.compareTo(r) < 0) {
					var n = i;
					(i = r), (r = n);
				}
				var s = i.getLowestSetBit(),
					o = r.getLowestSetBit();
				if (o < 0) e(i);
				else {
					s < o && (o = s), o > 0 && (i.rShiftTo(o, i), r.rShiftTo(o, r));
					var h = function () {
						(s = i.getLowestSetBit()) > 0 && i.rShiftTo(s, i),
							(s = r.getLowestSetBit()) > 0 && r.rShiftTo(s, r),
							i.compareTo(r) >= 0 ? (i.subTo(r, i), i.rShiftTo(1, i)) : (r.subTo(i, r), r.rShiftTo(1, r)),
							i.signum() > 0
								? setTimeout(h, 0)
								: (o > 0 && r.lShiftTo(o, r),
								  setTimeout(function () {
										e(r);
								  }, 0));
					};
					setTimeout(h, 10);
				}
			};
			BigInteger.prototype.fromNumberAsync = function (t, e, i, r) {
				if ('number' == typeof e)
					if (t < 2) this.fromInt(1);
					else {
						this.fromNumber(t, i), this.testBit(t - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(t - 1), op_or, this), this.isEven() && this.dAddOffset(1, 0);
						var n = this,
							s = function () {
								n.dAddOffset(2, 0),
									n.bitLength() > t && n.subTo(BigInteger.ONE.shiftLeft(t - 1), n),
									n.isProbablePrime(e)
										? setTimeout(function () {
												r();
										  }, 0)
										: setTimeout(s, 0);
							};
						setTimeout(s, 0);
					}
				else {
					var o = new Array(),
						h = 7 & t;
					(o.length = 1 + (t >> 3)), e.nextBytes(o), h > 0 ? (o[0] &= (1 << h) - 1) : (o[0] = 0), this.fromString(o, 256);
				}
			};
		})();
	var b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
		b64pad = '=';
	function hex2b64(t) {
		var e,
			i,
			r = '';
		for (e = 0; e + 3 <= t.length; e += 3) (i = parseInt(t.substring(e, e + 3), 16)), (r += b64map.charAt(i >> 6) + b64map.charAt(63 & i));
		for (
			e + 1 == t.length
				? ((i = parseInt(t.substring(e, e + 1), 16)), (r += b64map.charAt(i << 2)))
				: e + 2 == t.length && ((i = parseInt(t.substring(e, e + 2), 16)), (r += b64map.charAt(i >> 2) + b64map.charAt((3 & i) << 4)));
			(3 & r.length) > 0;

		)
			r += b64pad;
		return r;
	}
	function b64tohex(t) {
		var e,
			i,
			r = '',
			n = 0;
		for (e = 0; e < t.length && t.charAt(e) != b64pad; ++e)
			(v = b64map.indexOf(t.charAt(e))),
				v < 0 ||
					(0 == n
						? ((r += int2char(v >> 2)), (i = 3 & v), (n = 1))
						: 1 == n
						? ((r += int2char((i << 2) | (v >> 4))), (i = 15 & v), (n = 2))
						: 2 == n
						? ((r += int2char(i)), (r += int2char(v >> 2)), (i = 3 & v), (n = 3))
						: ((r += int2char((i << 2) | (v >> 4))), (r += int2char(15 & v)), (n = 0)));
		return 1 == n && (r += int2char(i << 2)), r;
	}
	function b64toBA(t) {
		var e,
			i = b64tohex(t),
			r = new Array();
		for (e = 0; 2 * e < i.length; ++e) r[e] = parseInt(i.substring(2 * e, 2 * e + 2), 16);
		return r;
	}
	var JSX = JSX || {};
	JSX.env = JSX.env || {};
	var L = JSX,
		OP = Object.prototype,
		FUNCTION_TOSTRING = '[object Function]',
		ADD = ['toString', 'valueOf'];
	(JSX.env.parseUA = function (t) {
		var e,
			i = function (t) {
				var e = 0;
				return parseFloat(
					t.replace(/\./g, function () {
						return 1 == e++ ? '' : '.';
					})
				);
			},
			r = {
				ie: 0,
				opera: 0,
				gecko: 0,
				webkit: 0,
				chrome: 0,
				mobile: null,
				air: 0,
				ipad: 0,
				iphone: 0,
				ipod: 0,
				ios: null,
				android: 0,
				webos: 0,
				caja: navigator && navigator.cajaVersion,
				secure: !1,
				os: null
			},
			n = t || (navigator && navigator.userAgent),
			s = window && window.location,
			o = s && s.href;
		return (
			(r.secure = o && 0 === o.toLowerCase().indexOf('https')),
			n &&
				(/windows|win32/i.test(n) ? (r.os = 'windows') : /macintosh/i.test(n) ? (r.os = 'macintosh') : /rhino/i.test(n) && (r.os = 'rhino'),
				/KHTML/.test(n) && (r.webkit = 1),
				(e = n.match(/AppleWebKit\/([^\s]*)/)) &&
					e[1] &&
					((r.webkit = i(e[1])),
					/ Mobile\//.test(n)
						? ((r.mobile = 'Apple'),
						  (e = n.match(/OS ([^\s]*)/)) && e[1] && (e = i(e[1].replace('_', '.'))),
						  (r.ios = e),
						  (r.ipad = r.ipod = r.iphone = 0),
						  (e = n.match(/iPad|iPod|iPhone/)) && e[0] && (r[e[0].toLowerCase()] = r.ios))
						: ((e = n.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) && (r.mobile = e[0]),
						  /webOS/.test(n) && ((r.mobile = 'WebOS'), (e = n.match(/webOS\/([^\s]*);/)) && e[1] && (r.webos = i(e[1]))),
						  / Android/.test(n) && ((r.mobile = 'Android'), (e = n.match(/Android ([^\s]*);/)) && e[1] && (r.android = i(e[1])))),
					(e = n.match(/Chrome\/([^\s]*)/)) && e[1] ? (r.chrome = i(e[1])) : (e = n.match(/AdobeAIR\/([^\s]*)/)) && (r.air = e[0])),
				r.webkit ||
					((e = n.match(/Opera[\s\/]([^\s]*)/)) && e[1]
						? ((r.opera = i(e[1])), (e = n.match(/Version\/([^\s]*)/)) && e[1] && (r.opera = i(e[1])), (e = n.match(/Opera Mini[^;]*/)) && (r.mobile = e[0]))
						: (e = n.match(/MSIE\s([^;]*)/)) && e[1]
						? (r.ie = i(e[1]))
						: (e = n.match(/Gecko\/([^\s]*)/)) && ((r.gecko = 1), (e = n.match(/rv:([^\s\)]*)/)) && e[1] && (r.gecko = i(e[1]))))),
			r
		);
	}),
		(JSX.env.ua = JSX.env.parseUA()),
		(JSX.isFunction = function (t) {
			return 'function' == typeof t || OP.toString.apply(t) === FUNCTION_TOSTRING;
		}),
		(JSX._IEEnumFix = JSX.env.ua.ie
			? function (t, e) {
					var i, r, n;
					for (i = 0; i < ADD.length; i += 1) (n = e[(r = ADD[i])]), L.isFunction(n) && n != OP[r] && (t[r] = n);
			  }
			: function () {}),
		(JSX.extend = function (t, e, i) {
			if (!e || !t) throw new Error('extend failed, please check that all dependencies are included.');
			var r,
				n = function () {};
			if (
				((n.prototype = e.prototype),
				(t.prototype = new n()),
				(t.prototype.constructor = t),
				(t.superclass = e.prototype),
				e.prototype.constructor == OP.constructor && (e.prototype.constructor = e),
				i)
			) {
				for (r in i) L.hasOwnProperty(i, r) && (t.prototype[r] = i[r]);
				L._IEEnumFix(t.prototype, i);
			}
		}),
		('undefined' != typeof KJUR && KJUR) || (KJUR = {}),
		(void 0 !== KJUR.asn1 && KJUR.asn1) || (KJUR.asn1 = {}),
		(KJUR.asn1.ASN1Util = new (function () {
			(this.integerToByteHex = function (t) {
				var e = t.toString(16);
				return e.length % 2 == 1 && (e = '0' + e), e;
			}),
				(this.bigIntToMinTwosComplementsHex = function (t) {
					var e = t.toString(16);
					if ('-' != e.substr(0, 1)) e.length % 2 == 1 ? (e = '0' + e) : e.match(/^[0-7]/) || (e = '00' + e);
					else {
						var i = e.substr(1).length;
						i % 2 == 1 ? (i += 1) : e.match(/^[0-7]/) || (i += 2);
						for (var r = '', n = 0; n < i; n++) r += 'f';
						e = new BigInteger(r, 16).xor(t).add(BigInteger.ONE).toString(16).replace(/^-/, '');
					}
					return e;
				}),
				(this.getPEMStringFromHex = function (t, e) {
					var i = CryptoJS.enc.Hex.parse(t),
						r = CryptoJS.enc.Base64.stringify(i).replace(/(.{64})/g, '$1\r\n');
					return '-----BEGIN ' + e + '-----\r\n' + (r = r.replace(/\r\n$/, '')) + '\r\n-----END ' + e + '-----\r\n';
				});
		})()),
		(KJUR.asn1.ASN1Object = function () {
			(this.getLengthHexFromValue = function () {
				if (void 0 === this.hV || null == this.hV) throw 'this.hV is null or undefined.';
				if (this.hV.length % 2 == 1) throw 'value hex must be even length: n=' + ''.length + ',v=' + this.hV;
				var t = this.hV.length / 2,
					e = t.toString(16);
				if ((e.length % 2 == 1 && (e = '0' + e), t < 128)) return e;
				var i = e.length / 2;
				if (i > 15) throw 'ASN.1 length too long to represent by 8x: n = ' + t.toString(16);
				return (128 + i).toString(16) + e;
			}),
				(this.getEncodedHex = function () {
					return (
						(null == this.hTLV || this.isModified) &&
							((this.hV = this.getFreshValueHex()), (this.hL = this.getLengthHexFromValue()), (this.hTLV = this.hT + this.hL + this.hV), (this.isModified = !1)),
						this.hTLV
					);
				}),
				(this.getValueHex = function () {
					return this.getEncodedHex(), this.hV;
				}),
				(this.getFreshValueHex = function () {
					return '';
				});
		}),
		(KJUR.asn1.DERAbstractString = function (t) {
			KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
			(this.getString = function () {
				return this.s;
			}),
				(this.setString = function (t) {
					(this.hTLV = null), (this.isModified = !0), (this.s = t), (this.hV = stohex(this.s));
				}),
				(this.setStringHex = function (t) {
					(this.hTLV = null), (this.isModified = !0), (this.s = null), (this.hV = t);
				}),
				(this.getFreshValueHex = function () {
					return this.hV;
				}),
				void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex));
		}),
		JSX.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object),
		(KJUR.asn1.DERAbstractTime = function (t) {
			KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
			(this.localDateToUTC = function (t) {
				return (utc = t.getTime() + 6e4 * t.getTimezoneOffset()), new Date(utc);
			}),
				(this.formatDate = function (t, e) {
					var i = this.zeroPadding,
						r = this.localDateToUTC(t),
						n = String(r.getFullYear());
					return (
						'utc' == e && (n = n.substr(2, 2)),
						n +
							i(String(r.getMonth() + 1), 2) +
							i(String(r.getDate()), 2) +
							i(String(r.getHours()), 2) +
							i(String(r.getMinutes()), 2) +
							i(String(r.getSeconds()), 2) +
							'Z'
					);
				}),
				(this.zeroPadding = function (t, e) {
					return t.length >= e ? t : new Array(e - t.length + 1).join('0') + t;
				}),
				(this.getString = function () {
					return this.s;
				}),
				(this.setString = function (t) {
					(this.hTLV = null), (this.isModified = !0), (this.s = t), (this.hV = stohex(this.s));
				}),
				(this.setByDateValue = function (t, e, i, r, n, s) {
					var o = new Date(Date.UTC(t, e - 1, i, r, n, s, 0));
					this.setByDate(o);
				}),
				(this.getFreshValueHex = function () {
					return this.hV;
				});
		}),
		JSX.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object),
		(KJUR.asn1.DERAbstractStructured = function (t) {
			KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
			(this.setByASN1ObjectArray = function (t) {
				(this.hTLV = null), (this.isModified = !0), (this.asn1Array = t);
			}),
				(this.appendASN1Object = function (t) {
					(this.hTLV = null), (this.isModified = !0), this.asn1Array.push(t);
				}),
				(this.asn1Array = new Array()),
				void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array);
		}),
		JSX.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object),
		(KJUR.asn1.DERBoolean = function () {
			KJUR.asn1.DERBoolean.superclass.constructor.call(this), (this.hT = '01'), (this.hTLV = '0101ff');
		}),
		JSX.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object),
		(KJUR.asn1.DERInteger = function (t) {
			KJUR.asn1.DERInteger.superclass.constructor.call(this),
				(this.hT = '02'),
				(this.setByBigInteger = function (t) {
					(this.hTLV = null), (this.isModified = !0), (this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t));
				}),
				(this.setByInteger = function (t) {
					var e = new BigInteger(String(t), 10);
					this.setByBigInteger(e);
				}),
				(this.setValueHex = function (t) {
					this.hV = t;
				}),
				(this.getFreshValueHex = function () {
					return this.hV;
				}),
				void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : void 0 !== t.hex && this.setValueHex(t.hex));
		}),
		JSX.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object),
		(KJUR.asn1.DERBitString = function (t) {
			KJUR.asn1.DERBitString.superclass.constructor.call(this),
				(this.hT = '03'),
				(this.setHexValueIncludingUnusedBits = function (t) {
					(this.hTLV = null), (this.isModified = !0), (this.hV = t);
				}),
				(this.setUnusedBitsAndHexValue = function (t, e) {
					if (t < 0 || 7 < t) throw 'unused bits shall be from 0 to 7: u = ' + t;
					var i = '0' + t;
					(this.hTLV = null), (this.isModified = !0), (this.hV = i + e);
				}),
				(this.setByBinaryString = function (t) {
					var e = 8 - ((t = t.replace(/0+$/, '')).length % 8);
					8 == e && (e = 0);
					for (var i = 0; i <= e; i++) t += '0';
					var r = '';
					for (i = 0; i < t.length - 1; i += 8) {
						var n = t.substr(i, 8),
							s = parseInt(n, 2).toString(16);
						1 == s.length && (s = '0' + s), (r += s);
					}
					(this.hTLV = null), (this.isModified = !0), (this.hV = '0' + e + r);
				}),
				(this.setByBooleanArray = function (t) {
					for (var e = '', i = 0; i < t.length; i++) 1 == t[i] ? (e += '1') : (e += '0');
					this.setByBinaryString(e);
				}),
				(this.newFalseArray = function (t) {
					for (var e = new Array(t), i = 0; i < t; i++) e[i] = !1;
					return e;
				}),
				(this.getFreshValueHex = function () {
					return this.hV;
				}),
				void 0 !== t &&
					(void 0 !== t.hex
						? this.setHexValueIncludingUnusedBits(t.hex)
						: void 0 !== t.bin
						? this.setByBinaryString(t.bin)
						: void 0 !== t.array && this.setByBooleanArray(t.array));
		}),
		JSX.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object),
		(KJUR.asn1.DEROctetString = function (t) {
			KJUR.asn1.DEROctetString.superclass.constructor.call(this, t), (this.hT = '04');
		}),
		JSX.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString),
		(KJUR.asn1.DERNull = function () {
			KJUR.asn1.DERNull.superclass.constructor.call(this), (this.hT = '05'), (this.hTLV = '0500');
		}),
		JSX.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object),
		(KJUR.asn1.DERObjectIdentifier = function (t) {
			var e = function (t) {
					var e = t.toString(16);
					return 1 == e.length && (e = '0' + e), e;
				},
				i = function (t) {
					var i = '',
						r = new BigInteger(t, 10).toString(2),
						n = 7 - (r.length % 7);
					7 == n && (n = 0);
					for (var s = '', o = 0; o < n; o++) s += '0';
					r = s + r;
					for (o = 0; o < r.length - 1; o += 7) {
						var h = r.substr(o, 7);
						o != r.length - 7 && (h = '1' + h), (i += e(parseInt(h, 2)));
					}
					return i;
				};
			KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this),
				(this.hT = '06'),
				(this.setValueHex = function (t) {
					(this.hTLV = null), (this.isModified = !0), (this.s = null), (this.hV = t);
				}),
				(this.setValueOidString = function (t) {
					if (!t.match(/^[0-9.]+$/)) throw 'malformed oid string: ' + t;
					var r = '',
						n = t.split('.'),
						s = 40 * parseInt(n[0]) + parseInt(n[1]);
					(r += e(s)), n.splice(0, 2);
					for (var o = 0; o < n.length; o++) r += i(n[o]);
					(this.hTLV = null), (this.isModified = !0), (this.s = null), (this.hV = r);
				}),
				(this.setValueName = function (t) {
					if (void 0 === KJUR.asn1.x509.OID.name2oidList[t]) throw 'DERObjectIdentifier oidName undefined: ' + t;
					var e = KJUR.asn1.x509.OID.name2oidList[t];
					this.setValueOidString(e);
				}),
				(this.getFreshValueHex = function () {
					return this.hV;
				}),
				void 0 !== t && (void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name));
		}),
		JSX.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object),
		(KJUR.asn1.DERUTF8String = function (t) {
			KJUR.asn1.DERUTF8String.superclass.constructor.call(this, t), (this.hT = '0c');
		}),
		JSX.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString),
		(KJUR.asn1.DERNumericString = function (t) {
			KJUR.asn1.DERNumericString.superclass.constructor.call(this, t), (this.hT = '12');
		}),
		JSX.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString),
		(KJUR.asn1.DERPrintableString = function (t) {
			KJUR.asn1.DERPrintableString.superclass.constructor.call(this, t), (this.hT = '13');
		}),
		JSX.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString),
		(KJUR.asn1.DERTeletexString = function (t) {
			KJUR.asn1.DERTeletexString.superclass.constructor.call(this, t), (this.hT = '14');
		}),
		JSX.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString),
		(KJUR.asn1.DERIA5String = function (t) {
			KJUR.asn1.DERIA5String.superclass.constructor.call(this, t), (this.hT = '16');
		}),
		JSX.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString),
		(KJUR.asn1.DERUTCTime = function (t) {
			KJUR.asn1.DERUTCTime.superclass.constructor.call(this, t),
				(this.hT = '17'),
				(this.setByDate = function (t) {
					(this.hTLV = null), (this.isModified = !0), (this.date = t), (this.s = this.formatDate(this.date, 'utc')), (this.hV = stohex(this.s));
				}),
				void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date));
		}),
		JSX.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime),
		(KJUR.asn1.DERGeneralizedTime = function (t) {
			KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
				(this.hT = '18'),
				(this.setByDate = function (t) {
					(this.hTLV = null), (this.isModified = !0), (this.date = t), (this.s = this.formatDate(this.date, 'gen')), (this.hV = stohex(this.s));
				}),
				void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date));
		}),
		JSX.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime),
		(KJUR.asn1.DERSequence = function (t) {
			KJUR.asn1.DERSequence.superclass.constructor.call(this, t),
				(this.hT = '30'),
				(this.getFreshValueHex = function () {
					for (var t = '', e = 0; e < this.asn1Array.length; e++) {
						t += this.asn1Array[e].getEncodedHex();
					}
					return (this.hV = t), this.hV;
				});
		}),
		JSX.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured),
		(KJUR.asn1.DERSet = function (t) {
			KJUR.asn1.DERSet.superclass.constructor.call(this, t),
				(this.hT = '31'),
				(this.getFreshValueHex = function () {
					for (var t = new Array(), e = 0; e < this.asn1Array.length; e++) {
						var i = this.asn1Array[e];
						t.push(i.getEncodedHex());
					}
					return t.sort(), (this.hV = t.join('')), this.hV;
				});
		}),
		JSX.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured),
		(KJUR.asn1.DERTaggedObject = function (t) {
			KJUR.asn1.DERTaggedObject.superclass.constructor.call(this),
				(this.hT = 'a0'),
				(this.hV = ''),
				(this.isExplicit = !0),
				(this.asn1Object = null),
				(this.setASN1Object = function (t, e, i) {
					(this.hT = e),
						(this.isExplicit = t),
						(this.asn1Object = i),
						this.isExplicit
							? ((this.hV = this.asn1Object.getEncodedHex()), (this.hTLV = null), (this.isModified = !0))
							: ((this.hV = null), (this.hTLV = i.getEncodedHex()), (this.hTLV = this.hTLV.replace(/^../, e)), (this.isModified = !1));
				}),
				(this.getFreshValueHex = function () {
					return this.hV;
				}),
				void 0 !== t &&
					(void 0 !== t.tag && (this.hT = t.tag),
					void 0 !== t.explicit && (this.isExplicit = t.explicit),
					void 0 !== t.obj && ((this.asn1Object = t.obj), this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)));
		}),
		JSX.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object),
		(function (t) {
			'use strict';
			var e,
				i = {};
			(i.decode = function (t) {
				var i;
				if (void 0 === e) {
					var r = '0123456789ABCDEF',
						n = ' \f\n\r\t?\u2028\u2029';
					for (e = [], i = 0; i < 16; ++i) e[r.charAt(i)] = i;
					for (r = r.toLowerCase(), i = 10; i < 16; ++i) e[r.charAt(i)] = i;
					for (i = 0; i < n.length; ++i) e[n.charAt(i)] = -1;
				}
				var s = [],
					o = 0,
					h = 0;
				for (i = 0; i < t.length; ++i) {
					var a = t.charAt(i);
					if ('=' == a) break;
					if (-1 != (a = e[a])) {
						if (void 0 === a) throw 'Illegal character at offset ' + i;
						(o |= a), ++h >= 2 ? ((s[s.length] = o), (o = 0), (h = 0)) : (o <<= 4);
					}
				}
				if (h) throw 'Hex encoding incomplete: 4 bits missing';
				return s;
			}),
				(window.Hex = i);
		})(),
		(function (t) {
			'use strict';
			var e,
				i = {};
			(i.decode = function (t) {
				var i;
				if (void 0 === e) {
					var r = '= \f\n\r\t?\u2028\u2029';
					for (e = [], i = 0; i < 64; ++i) e['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(i)] = i;
					for (i = 0; i < r.length; ++i) e[r.charAt(i)] = -1;
				}
				var n = [],
					s = 0,
					o = 0;
				for (i = 0; i < t.length; ++i) {
					var h = t.charAt(i);
					if ('=' == h) break;
					if (-1 != (h = e[h])) {
						if (void 0 === h) throw 'Illegal character at offset ' + i;
						(s |= h), ++o >= 4 ? ((n[n.length] = s >> 16), (n[n.length] = (s >> 8) & 255), (n[n.length] = 255 & s), (s = 0), (o = 0)) : (s <<= 6);
					}
				}
				switch (o) {
					case 1:
						throw 'Base64 encoding incomplete: at least 2 bits missing';
					case 2:
						n[n.length] = s >> 10;
						break;
					case 3:
						(n[n.length] = s >> 16), (n[n.length] = (s >> 8) & 255);
				}
				return n;
			}),
				(i.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/),
				(i.unarmor = function (t) {
					var e = i.re.exec(t);
					if (e)
						if (e[1]) t = e[1];
						else {
							if (!e[2]) throw 'RegExp out of sync';
							t = e[2];
						}
					return i.decode(t);
				}),
				(window.Base64 = i);
		})(),
		(function (t) {
			'use strict';
			var e = function (t, e) {
					var i = document.createElement(t);
					return (i.className = e), i;
				},
				i = function (t) {
					return document.createTextNode(t);
				};
			function r(t, e) {
				t instanceof r ? ((this.enc = t.enc), (this.pos = t.pos)) : ((this.enc = t), (this.pos = e));
			}
			function n(t, e, i, r, n) {
				(this.stream = t), (this.header = e), (this.length = i), (this.tag = r), (this.sub = n);
			}
			(r.prototype.get = function (t) {
				if ((void 0 === t && (t = this.pos++), t >= this.enc.length)) throw 'Requesting byte offset ' + t + ' on a stream of length ' + this.enc.length;
				return this.enc[t];
			}),
				(r.prototype.hexDigits = '0123456789ABCDEF'),
				(r.prototype.hexByte = function (t) {
					return this.hexDigits.charAt((t >> 4) & 15) + this.hexDigits.charAt(15 & t);
				}),
				(r.prototype.hexDump = function (t, e, i) {
					for (var r = '', n = t; n < e; ++n)
						if (((r += this.hexByte(this.get(n))), !0 !== i))
							switch (15 & n) {
								case 7:
									r += '  ';
									break;
								case 15:
									r += '\n';
									break;
								default:
									r += ' ';
							}
					return r;
				}),
				(r.prototype.parseStringISO = function (t, e) {
					for (var i = '', r = t; r < e; ++r) i += String.fromCharCode(this.get(r));
					return i;
				}),
				(r.prototype.parseStringUTF = function (t, e) {
					for (var i = '', r = t; r < e; ) {
						var n = this.get(r++);
						i +=
							n < 128
								? String.fromCharCode(n)
								: n > 191 && n < 224
								? String.fromCharCode(((31 & n) << 6) | (63 & this.get(r++)))
								: String.fromCharCode(((15 & n) << 12) | ((63 & this.get(r++)) << 6) | (63 & this.get(r++)));
					}
					return i;
				}),
				(r.prototype.parseStringBMP = function (t, e) {
					for (var i = '', r = t; r < e; r += 2) {
						var n = this.get(r),
							s = this.get(r + 1);
						i += String.fromCharCode((n << 8) + s);
					}
					return i;
				}),
				(r.prototype.reTime =
					/^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/),
				(r.prototype.parseTime = function (t, e) {
					var i = this.parseStringISO(t, e),
						r = this.reTime.exec(i);
					return r
						? ((i = r[1] + '-' + r[2] + '-' + r[3] + ' ' + r[4]),
						  r[5] && ((i += ':' + r[5]), r[6] && ((i += ':' + r[6]), r[7] && (i += '.' + r[7]))),
						  r[8] && ((i += ' UTC'), 'Z' != r[8] && ((i += r[8]), r[9] && (i += ':' + r[9]))),
						  i)
						: 'Unrecognized time: ' + i;
				}),
				(r.prototype.parseInteger = function (t, e) {
					var i = e - t;
					if (i > 4) {
						i <<= 3;
						var r = this.get(t);
						if (0 === r) i -= 8;
						else for (; r < 128; ) (r <<= 1), --i;
						return '(' + i + ' bit)';
					}
					for (var n = 0, s = t; s < e; ++s) n = (n << 8) | this.get(s);
					return n;
				}),
				(r.prototype.parseBitString = function (t, e) {
					var i = this.get(t),
						r = ((e - t - 1) << 3) - i,
						n = '(' + r + ' bit)';
					if (r <= 20) {
						var s = i;
						n += ' ';
						for (var o = e - 1; o > t; --o) {
							for (var h = this.get(o), a = s; a < 8; ++a) n += (h >> a) & 1 ? '1' : '0';
							s = 0;
						}
					}
					return n;
				}),
				(r.prototype.parseOctetString = function (t, e) {
					var i = e - t,
						r = '(' + i + ' byte) ';
					i > 100 && (e = t + 100);
					for (var n = t; n < e; ++n) r += this.hexByte(this.get(n));
					return i > 100 && (r += '…'), r;
				}),
				(r.prototype.parseOID = function (t, e) {
					for (var i = '', r = 0, n = 0, s = t; s < e; ++s) {
						var o = this.get(s);
						if (((r = (r << 7) | (127 & o)), (n += 7), !(128 & o))) {
							if ('' === i) {
								var h = r < 80 ? (r < 40 ? 0 : 1) : 2;
								i = h + '.' + (r - 40 * h);
							} else i += '.' + (n >= 31 ? 'bigint' : r);
							r = n = 0;
						}
					}
					return i;
				}),
				(n.prototype.typeName = function () {
					if (void 0 === this.tag) return 'unknown';
					var t = this.tag >> 6,
						e = (this.tag, 31 & this.tag);
					switch (t) {
						case 0:
							switch (e) {
								case 0:
									return 'EOC';
								case 1:
									return 'BOOLEAN';
								case 2:
									return 'INTEGER';
								case 3:
									return 'BIT_STRING';
								case 4:
									return 'OCTET_STRING';
								case 5:
									return 'NULL';
								case 6:
									return 'OBJECT_IDENTIFIER';
								case 7:
									return 'ObjectDescriptor';
								case 8:
									return 'EXTERNAL';
								case 9:
									return 'REAL';
								case 10:
									return 'ENUMERATED';
								case 11:
									return 'EMBEDDED_PDV';
								case 12:
									return 'UTF8String';
								case 16:
									return 'SEQUENCE';
								case 17:
									return 'SET';
								case 18:
									return 'NumericString';
								case 19:
									return 'PrintableString';
								case 20:
									return 'TeletexString';
								case 21:
									return 'VideotexString';
								case 22:
									return 'IA5String';
								case 23:
									return 'UTCTime';
								case 24:
									return 'GeneralizedTime';
								case 25:
									return 'GraphicString';
								case 26:
									return 'VisibleString';
								case 27:
									return 'GeneralString';
								case 28:
									return 'UniversalString';
								case 30:
									return 'BMPString';
								default:
									return 'Universal_' + e.toString(16);
							}
						case 1:
							return 'Application_' + e.toString(16);
						case 2:
							return '[' + e + ']';
						case 3:
							return 'Private_' + e.toString(16);
					}
				}),
				(n.prototype.reSeemsASCII = /^[ -~]+$/),
				(n.prototype.content = function () {
					if (void 0 === this.tag) return null;
					var t = this.tag >> 6,
						e = 31 & this.tag,
						i = this.posContent(),
						r = Math.abs(this.length);
					if (0 !== t) {
						if (null !== this.sub) return '(' + this.sub.length + ' elem)';
						var n = this.stream.parseStringISO(i, i + Math.min(r, 100));
						return this.reSeemsASCII.test(n) ? n.substring(0, 200) + (n.length > 200 ? '…' : '') : this.stream.parseOctetString(i, i + r);
					}
					switch (e) {
						case 1:
							return 0 === this.stream.get(i) ? 'false' : 'true';
						case 2:
							return this.stream.parseInteger(i, i + r);
						case 3:
							return this.sub ? '(' + this.sub.length + ' elem)' : this.stream.parseBitString(i, i + r);
						case 4:
							return this.sub ? '(' + this.sub.length + ' elem)' : this.stream.parseOctetString(i, i + r);
						case 6:
							return this.stream.parseOID(i, i + r);
						case 16:
						case 17:
							return '(' + this.sub.length + ' elem)';
						case 12:
							return this.stream.parseStringUTF(i, i + r);
						case 18:
						case 19:
						case 20:
						case 21:
						case 22:
						case 26:
							return this.stream.parseStringISO(i, i + r);
						case 30:
							return this.stream.parseStringBMP(i, i + r);
						case 23:
						case 24:
							return this.stream.parseTime(i, i + r);
					}
					return null;
				}),
				(n.prototype.toString = function () {
					return (
						this.typeName() +
						'@' +
						this.stream.pos +
						'[header:' +
						this.header +
						',length:' +
						this.length +
						',sub:' +
						(null === this.sub ? 'null' : this.sub.length) +
						']'
					);
				}),
				(n.prototype.print = function (t) {
					if ((void 0 === t && (t = ''), document.writeln(t + this), null !== this.sub)) {
						t += '  ';
						for (var e = 0, i = this.sub.length; e < i; ++e) this.sub[e].print(t);
					}
				}),
				(n.prototype.toPrettyString = function (t) {
					void 0 === t && (t = '');
					var e = t + this.typeName() + ' @' + this.stream.pos;
					if (
						(this.length >= 0 && (e += '+'),
						(e += this.length),
						32 & this.tag ? (e += ' (constructed)') : (3 != this.tag && 4 != this.tag) || null === this.sub || (e += ' (encapsulates)'),
						(e += '\n'),
						null !== this.sub)
					) {
						t += '  ';
						for (var i = 0, r = this.sub.length; i < r; ++i) e += this.sub[i].toPrettyString(t);
					}
					return e;
				}),
				(n.prototype.toDOM = function () {
					var t = e('div', 'node');
					t.asn1 = this;
					var r = e('div', 'head'),
						n = this.typeName().replace(/_/g, ' ');
					r.innerHTML = n;
					var s = this.content();
					if (null !== s) {
						s = String(s).replace(/</g, '&lt;');
						var o = e('span', 'preview');
						o.appendChild(i(s)), r.appendChild(o);
					}
					t.appendChild(r), (this.node = t), (this.head = r);
					var h = e('div', 'value');
					if (
						((n = 'Offset: ' + this.stream.pos + '<br/>'),
						(n += 'Length: ' + this.header + '+'),
						this.length >= 0 ? (n += this.length) : (n += -this.length + ' (undefined)'),
						32 & this.tag ? (n += '<br/>(constructed)') : (3 != this.tag && 4 != this.tag) || null === this.sub || (n += '<br/>(encapsulates)'),
						null !== s && ((n += '<br/>Value:<br/><b>' + s + '</b>'), 'object' == typeof oids && 6 == this.tag))
					) {
						var a = oids[s];
						a && (a.d && (n += '<br/>' + a.d), a.c && (n += '<br/>' + a.c), a.w && (n += '<br/>(warning!)'));
					}
					(h.innerHTML = n), t.appendChild(h);
					var u = e('div', 'sub');
					if (null !== this.sub) for (var p = 0, c = this.sub.length; p < c; ++p) u.appendChild(this.sub[p].toDOM());
					return (
						t.appendChild(u),
						(r.onclick = function () {
							t.className = 'node collapsed' == t.className ? 'node' : 'node collapsed';
						}),
						t
					);
				}),
				(n.prototype.posStart = function () {
					return this.stream.pos;
				}),
				(n.prototype.posContent = function () {
					return this.stream.pos + this.header;
				}),
				(n.prototype.posEnd = function () {
					return this.stream.pos + this.header + Math.abs(this.length);
				}),
				(n.prototype.fakeHover = function (t) {
					(this.node.className += ' hover'), t && (this.head.className += ' hover');
				}),
				(n.prototype.fakeOut = function (t) {
					var e = / ?hover/;
					(this.node.className = this.node.className.replace(e, '')), t && (this.head.className = this.head.className.replace(e, ''));
				}),
				(n.prototype.toHexDOM_sub = function (t, r, n, s, o) {
					if (!(s >= o)) {
						var h = e('span', r);
						h.appendChild(i(n.hexDump(s, o))), t.appendChild(h);
					}
				}),
				(n.prototype.toHexDOM = function (t) {
					var r = e('span', 'hex');
					if (
						(void 0 === t && (t = r),
						(this.head.hexNode = r),
						(this.head.onmouseover = function () {
							this.hexNode.className = 'hexCurrent';
						}),
						(this.head.onmouseout = function () {
							this.hexNode.className = 'hex';
						}),
						(r.asn1 = this),
						(r.onmouseover = function () {
							var e = !t.selected;
							e && ((t.selected = this.asn1), (this.className = 'hexCurrent')), this.asn1.fakeHover(e);
						}),
						(r.onmouseout = function () {
							var e = t.selected == this.asn1;
							this.asn1.fakeOut(e), e && ((t.selected = null), (this.className = 'hex'));
						}),
						this.toHexDOM_sub(r, 'tag', this.stream, this.posStart(), this.posStart() + 1),
						this.toHexDOM_sub(r, this.length >= 0 ? 'dlen' : 'ulen', this.stream, this.posStart() + 1, this.posContent()),
						null === this.sub)
					)
						r.appendChild(i(this.stream.hexDump(this.posContent(), this.posEnd())));
					else if (this.sub.length > 0) {
						var n = this.sub[0],
							s = this.sub[this.sub.length - 1];
						this.toHexDOM_sub(r, 'intro', this.stream, this.posContent(), n.posStart());
						for (var o = 0, h = this.sub.length; o < h; ++o) r.appendChild(this.sub[o].toHexDOM(t));
						this.toHexDOM_sub(r, 'outro', this.stream, s.posEnd(), this.posEnd());
					}
					return r;
				}),
				(n.prototype.toHexString = function (t) {
					return this.stream.hexDump(this.posStart(), this.posEnd(), !0);
				}),
				(n.decodeLength = function (t) {
					var e = t.get(),
						i = 127 & e;
					if (i == e) return i;
					if (i > 3) throw 'Length over 24 bits not supported at position ' + (t.pos - 1);
					if (0 === i) return -1;
					e = 0;
					for (var r = 0; r < i; ++r) e = (e << 8) | t.get();
					return e;
				}),
				(n.hasContent = function (t, e, i) {
					if (32 & t) return !0;
					if (t < 3 || t > 4) return !1;
					var s = new r(i);
					if ((3 == t && s.get(), (s.get() >> 6) & 1)) return !1;
					try {
						var o = n.decodeLength(s);
						return s.pos - i.pos + o == e;
					} catch (t) {
						return !1;
					}
				}),
				(n.decode = function (t) {
					t instanceof r || (t = new r(t, 0));
					var e = new r(t),
						i = t.get(),
						s = n.decodeLength(t),
						o = t.pos - e.pos,
						h = null;
					if (n.hasContent(i, s, t)) {
						var a = t.pos;
						if ((3 == i && t.get(), (h = []), s >= 0)) {
							for (var u = a + s; t.pos < u; ) h[h.length] = n.decode(t);
							if (t.pos != u) throw 'Content size is not correct for container starting at offset ' + a;
						} else
							try {
								for (;;) {
									var p = n.decode(t);
									if (0 === p.tag) break;
									h[h.length] = p;
								}
								s = a - t.pos;
							} catch (t) {
								throw 'Exception while decoding undefined length content: ' + t;
							}
					} else t.pos += s;
					return new n(e, o, s, i, h);
				}),
				(n.test = function () {
					for (
						var t = [
								{ value: [39], expected: 39 },
								{ value: [129, 201], expected: 201 },
								{ value: [131, 254, 220, 186], expected: 16702650 }
							],
							e = 0,
							i = t.length;
						e < i;
						++e
					) {
						var s = new r(t[e].value, 0),
							o = n.decodeLength(s);
						o != t[e].expected && document.write('In test[' + e + '] expected ' + t[e].expected + ' got ' + o + '\n');
					}
				}),
				(window.ASN1 = n);
		})(),
		(window.ASN1.prototype.getHexStringValue = function () {
			var t = this.toHexString(),
				e = 2 * this.header,
				i = 2 * this.length;
			return t.substr(e, i);
		}),
		(RSAKey.prototype.parseKey = function (t) {
			try {
				var e = 0,
					i = 0,
					r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? Hex.decode(t) : window.Base64.unarmor(t),
					n = window.ASN1.decode(r);
				if ((3 === n.sub.length && (n = n.sub[2].sub[0]), 9 === n.sub.length)) {
					(e = n.sub[1].getHexStringValue()), (this.n = parseBigInt(e, 16)), (i = n.sub[2].getHexStringValue()), (this.e = parseInt(i, 16));
					var s = n.sub[3].getHexStringValue();
					this.d = parseBigInt(s, 16);
					var o = n.sub[4].getHexStringValue();
					this.p = parseBigInt(o, 16);
					var h = n.sub[5].getHexStringValue();
					this.q = parseBigInt(h, 16);
					var a = n.sub[6].getHexStringValue();
					this.dmp1 = parseBigInt(a, 16);
					var u = n.sub[7].getHexStringValue();
					this.dmq1 = parseBigInt(u, 16);
					var p = n.sub[8].getHexStringValue();
					this.coeff = parseBigInt(p, 16);
				} else {
					if (2 !== n.sub.length) return !1;
					var c = n.sub[1].sub[0];
					(e = c.sub[0].getHexStringValue()), (this.n = parseBigInt(e, 16)), (i = c.sub[1].getHexStringValue()), (this.e = parseInt(i, 16));
				}
				return !0;
			} catch (t) {
				return !1;
			}
		}),
		(RSAKey.prototype.getPrivateBaseKey = function () {
			var t = {
				array: [
					new KJUR.asn1.DERInteger({ int: 0 }),
					new KJUR.asn1.DERInteger({ bigint: this.n }),
					new KJUR.asn1.DERInteger({ int: this.e }),
					new KJUR.asn1.DERInteger({ bigint: this.d }),
					new KJUR.asn1.DERInteger({ bigint: this.p }),
					new KJUR.asn1.DERInteger({ bigint: this.q }),
					new KJUR.asn1.DERInteger({ bigint: this.dmp1 }),
					new KJUR.asn1.DERInteger({ bigint: this.dmq1 }),
					new KJUR.asn1.DERInteger({ bigint: this.coeff })
				]
			};
			return new KJUR.asn1.DERSequence(t).getEncodedHex();
		}),
		(RSAKey.prototype.getPrivateBaseKeyB64 = function () {
			return hex2b64(this.getPrivateBaseKey());
		}),
		(RSAKey.prototype.getPublicBaseKey = function () {
			var t = { array: [new KJUR.asn1.DERObjectIdentifier({ oid: '1.2.840.113549.1.1.1' }), new KJUR.asn1.DERNull()] },
				e = new KJUR.asn1.DERSequence(t);
			return (
				(t = { array: [new KJUR.asn1.DERInteger({ bigint: this.n }), new KJUR.asn1.DERInteger({ int: this.e })] }),
				(t = { hex: '00' + new KJUR.asn1.DERSequence(t).getEncodedHex() }),
				(t = { array: [e, new KJUR.asn1.DERBitString(t)] }),
				new KJUR.asn1.DERSequence(t).getEncodedHex()
			);
		}),
		(RSAKey.prototype.getPublicBaseKeyB64 = function () {
			return hex2b64(this.getPublicBaseKey());
		}),
		(RSAKey.prototype.wordwrap = function (t, e) {
			if (!t) return t;
			var i = '(.{1,' + (e = e || 64) + '})( +|$\n?)|(.{1,' + e + '})';
			return t.match(RegExp(i, 'g')).join('\n');
		}),
		(RSAKey.prototype.getPrivateKey = function () {
			var t = '-----BEGIN RSA PRIVATE KEY-----\n';
			return (t += this.wordwrap(this.getPrivateBaseKeyB64()) + '\n'), (t += '-----END RSA PRIVATE KEY-----');
		}),
		(RSAKey.prototype.getPublicKey = function () {
			var t = '-----BEGIN PUBLIC KEY-----\n';
			return (t += this.wordwrap(this.getPublicBaseKeyB64()) + '\n'), (t += '-----END PUBLIC KEY-----');
		}),
		(RSAKey.prototype.hasPublicKeyProperty = function (t) {
			return (t = t || {}).hasOwnProperty('n') && t.hasOwnProperty('e');
		}),
		(RSAKey.prototype.hasPrivateKeyProperty = function (t) {
			return (
				(t = t || {}).hasOwnProperty('n') &&
				t.hasOwnProperty('e') &&
				t.hasOwnProperty('d') &&
				t.hasOwnProperty('p') &&
				t.hasOwnProperty('q') &&
				t.hasOwnProperty('dmp1') &&
				t.hasOwnProperty('dmq1') &&
				t.hasOwnProperty('coeff')
			);
		}),
		(RSAKey.prototype.parsePropertiesFrom = function (t) {
			(this.n = t.n),
				(this.e = t.e),
				t.hasOwnProperty('d') && ((this.d = t.d), (this.p = t.p), (this.q = t.q), (this.dmp1 = t.dmp1), (this.dmq1 = t.dmq1), (this.coeff = t.coeff));
		});
	var JSEncryptRSAKey = function (t) {
		RSAKey.call(this), t && ('string' == typeof t ? this.parseKey(t) : (this.hasPrivateKeyProperty(t) || this.hasPublicKeyProperty(t)) && this.parsePropertiesFrom(t));
	};
	(JSEncryptRSAKey.prototype = new RSAKey()), (JSEncryptRSAKey.prototype.constructor = JSEncryptRSAKey);
	var JSEncrypt = function (t) {
		(t = t || {}),
			(this.default_key_size = parseInt(t.default_key_size) || 1024),
			(this.default_public_exponent = t.default_public_exponent || '010001'),
			(this.log = t.log || !1),
			(this.key = null);
	};
	(JSEncrypt.prototype.setKey = function (t) {
		this.log && this.key && console.warn('A key was already set, overriding existing.'), (this.key = new JSEncryptRSAKey(t));
	}),
		(JSEncrypt.prototype.setPrivateKey = function (t) {
			this.setKey(t);
		}),
		(JSEncrypt.prototype.setPublicKey = function (t) {
			this.setKey(t);
		}),
		(JSEncrypt.prototype.private_decrypt = function (t) {
			try {
				return this.getKey().decrypt_private(b64tohex(t));
			} catch (t) {
				return !1;
			}
		}),
		(JSEncrypt.prototype.public_decrypt = function (t) {
			try {
				return this.getKey().decrypt_public(b64tohex(t));
			} catch (t) {
				return !1;
			}
		}),
		(JSEncrypt.prototype.public_encrypt = function (t) {
			try {
				return hex2b64(this.getKey().encrypt_public(t));
			} catch (t) {
				return !1;
			}
		}),
		(JSEncrypt.prototype.private_encrypt = function (t) {
			try {
				return hex2b64(this.getKey().encrypt_private(t));
			} catch (t) {
				return !1;
			}
		}),
		(JSEncrypt.prototype.setPublic = RSASetPublic),
		(JSEncrypt.prototype.getKey = function (t) {
			if (!this.key) {
				if (((this.key = new JSEncryptRSAKey()), t && '[object Function]' === {}.toString.call(t)))
					return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
				this.key.generate(this.default_key_size, this.default_public_exponent);
			}
			return this.key;
		}),
		(JSEncrypt.prototype.getPrivateKey = function () {
			return this.getKey().getPrivateKey();
		}),
		(JSEncrypt.prototype.getPrivateKeyB64 = function () {
			return this.getKey().getPrivateBaseKeyB64();
		}),
		(JSEncrypt.prototype.getPublicKey = function () {
			return this.getKey().getPublicKey();
		}),
		(JSEncrypt.prototype.getPublicKeyB64 = function () {
			return this.getKey().getPublicBaseKeyB64();
		}),
		(JSEncrypt.prototype.setPrivate = RSASetPrivate),
		(JSEncrypt.prototype.setPrivateEx = RSASetPrivateEx),
		(JSEncrypt.prototype.public_encryptLong = function (string, padding, output) {
			var k = this.getKey(),
				maxLength = ((k.n.bitLength() + 7) >> 3) - 11;
			try {
				var lt = '',
					ct = '';
				if (string.length > maxLength)
					return (
						(lt = string.match(eval('/.{1,' + maxLength + '}/g'))),
						lt.forEach(function (t) {
							var e = k.encrypt_public(t, padding);
							ct += e;
						}),
						output ? hex2b64(ct) : ct
					);
				var t = k.encrypt_public(string, padding),
					y = output ? hex2b64(t) : t;
				return y;
			} catch (t) {
				return !1;
			}
		}),
		(JSEncrypt.prototype.private_decryptLong = function (string, padding, output) {
			var k = this.getKey(),
				maxLength = ((k.n.bitLength() + 7) >> 3) - 11,
				MAX_DECRYPT_BLOCK = parseInt((k.n.bitLength() + 1) / 4);
			try {
				var ct = '';
				if (((string = output ? b64tohex(string) : string), string.length > maxLength)) {
					var lt = string.match(eval('/.{1,' + MAX_DECRYPT_BLOCK + '}/g'));
					return (
						lt.forEach(function (t) {
							var e = k.decrypt_private(t, padding);
							ct += e;
						}),
						ct
					);
				}
				var y = k.decrypt_private(string, padding);
				return y;
			} catch (t) {
				return !1;
			}
		}),
		(JSEncrypt.prototype.private_encryptLong = function (string, padding, output) {
			var k = this.getKey(),
				maxLength = ((k.n.bitLength() + 7) >> 3) - 11;
			try {
				var lt = '',
					ct = '';
				if (string.length > maxLength)
					return (
						(lt = string.match(eval('/.{1,' + maxLength + '}/g'))),
						lt.forEach(function (t) {
							var e = k.encrypt_private(t, padding);
							ct += e;
						}),
						output ? hex2b64(ct) : ct
					);
				var t = k.encrypt_private(string, padding),
					y = output ? hex2b64(t) : t;
				return y;
			} catch (t) {
				return !1;
			}
		}),
		(JSEncrypt.prototype.public_decryptLong = function (string, padding, output) {
			var k = this.getKey(),
				maxLength = ((k.n.bitLength() + 7) >> 3) - 11,
				MAX_DECRYPT_BLOCK = parseInt((k.n.bitLength() + 1) / 4);
			try {
				var ct = '';
				if (((string = output ? b64tohex(string) : string), string.length > maxLength)) {
					var lt = string.match(eval('/.{1,' + MAX_DECRYPT_BLOCK + '}/g'));
					return (
						lt.forEach(function (t) {
							var e = k.decrypt_public(t, padding);
							ct += e;
						}),
						ct
					);
				}
				var y = k.decrypt_public(string, padding);
				return y;
			} catch (t) {
				return !1;
			}
		}),
		(JSEncrypt.version = '2.3.0'),
		(exports.JSEncrypt = JSEncrypt);
})(RSA);

//************抠的算法
function s(e, t) {
	var n,
		r = 4 - (e.length % 4);
	n = t ? (0 == (3 & e.length) ? e.length >>> 2 : 1 + (e.length >>> 2)) : e.length / 4 + 1;
	for (var o = new Uint32Array(Math.floor(n)), i = (r << 24) + (r << 16) + (r << 8) + r, a = 0; a < n; ++a) o[a] = i;
	for (n = e.length, a = 0; a < n; ++a) (o[a >>> 2] &= ~(255 << ((3 & a) << 3))), (o[a >>> 2] |= (255 & e[a]) << ((3 & a) << 3));
	return o;
}
function u(e, t, n, r, o, i) {
	return (((n >>> 5) ^ (t << 2)) + ((t >>> 3) ^ (n << 4))) ^ ((e ^ t) + (i[(3 & r) ^ o] ^ n));
}
function l(e) {
	if (e.length < 16) {
		var t = new Uint8Array(16);
		t.set(e), (e = t);
	}
	return e;
}
function a(e, t) {
	var n = e.length,
		r = n << 2;
	if (t) {
		var o = e[n - 1];
		if (o < (r -= 4) - 3 || o > r) return null;
		r = o;
	}
	for (var i = new Uint8Array(Math.floor(r)), a = 0; a < r; ++a) i[a] = e[a >> 2] >> ((3 & a) << 3);
	return i;
}
function c(e) {
	for (var t = e.length, n = new Uint8Array(Math.floor(3 * t + 1)), r = 0, o = 0; o < t; o++) {
		var i = e.charCodeAt(o);
		if (i < 128) n[r++] = i;
		else if (i < 2048) (n[r++] = 192 | (i >> 6)), (n[r++] = 128 | (63 & i));
		else {
			if (!(i < 55296 || i > 57343)) {
				if (o + 1 < t) {
					var a = e.charCodeAt(o + 1);
					if (i < 56320 && 56320 <= a && a <= 57343) {
						var s = 65536 + (((1023 & i) << 10) | (1023 & a));
						(n[r++] = 240 | (s >> 18)), (n[r++] = 128 | ((s >> 12) & 63)), (n[r++] = 128 | ((s >> 6) & 63)), (n[r++] = 128 | (63 & s)), o++;
						continue;
					}
				}
				throw new Error('Malformed string');
			}
			(n[r++] = 224 | (i >> 12)), (n[r++] = 128 | ((i >> 6) & 63)), (n[r++] = 128 | (63 & i));
		}
	}
	return n.subarray(0, r + 1);
}
function d(e, t) {
	return (
		'string' == typeof e && (e = new Buffer(e, 'base64')),
		'string' == typeof t && (t = c(t)),
		null == e || 0 === e.length
			? e
			: a(
					(function (e, t) {
						var n,
							r,
							o,
							i,
							a,
							s = e.length,
							l = s - 1;
						for (n = e[0], o = 2654435769 * Math.floor(6 + 52 / s); 0 !== o; o -= 2654435769) {
							for (i = (o >>> 2) & 3, a = l; a > 0; --a) (r = e[a - 1]), (n = e[a] -= u(o, n, r, a, i, t));
							(r = e[l]), (n = e[0] -= u(o, n, r, a, i, t));
						}
						return e;
					})(s(e, !0), s(l(t), !0)),
					!1
			  )
	);
}
function f(e, t) {
	return (
		'string' == typeof e && (e = c(e)),
		'string' == typeof t && (t = c(t)),
		null == e || 0 === e.length
			? e
			: a(
					(function (e, t) {
						var n,
							r,
							o,
							i,
							a,
							s,
							l = e.length,
							c = l - 1;
						for (r = e[c], o = 0, s = 0 | Math.floor(6 + 52 / l); s > 0; --s) {
							for (i = ((o += 2654435769) >>> 2) & 3, a = 0; a < c; ++a) (n = e[a + 1]), (r = e[a] += u(o, n, r, a, i, t));
							(n = e[0]), (r = e[c] += u(o, n, r, a, i, t));
						}
						return e;
					})(s(e, !1), s(l(t), !1)),
					!1
			  )
	);
}
var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var base64DecodeChars = new Array(
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	62,
	-1,
	-1,
	-1,
	63,
	52,
	53,
	54,
	55,
	56,
	57,
	58,
	59,
	60,
	61,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24,
	25,
	-1,
	-1,
	-1,
	-1,
	-1,
	-1,
	26,
	27,
	28,
	29,
	30,
	31,
	32,
	33,
	34,
	35,
	36,
	37,
	38,
	39,
	40,
	41,
	42,
	43,
	44,
	45,
	46,
	47,
	48,
	49,
	50,
	51,
	-1,
	-1,
	-1,
	-1,
	-1
);
function base64encode(str) {
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = '';
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += '==';
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xf) << 2);
			out += '=';
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3f);
	}
	return out;
}
function base64decode(str) {
	var c1, c2, c3, c4;
	var i, len, out;
	len = str.length;
	i = 0;
	out = '';
	while (i < len) {
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1) break;
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1) break;
		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61) return out;
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1) break;
		out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61) return out;
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1) break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
}
//************抠的算法
function Json2Form() {
	var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	return Object.keys(t)
		.sort()
		.map(function (e) {
			return ''.concat(e, '=').concat(t[e]);
		})
		.join('&');
}
function Encrypt_Body(t, e) {
	return (function (t) {
		for (var e = '', n = new Uint8Array(t), r = n.byteLength, o = 0; o < r; o++) e += String.fromCharCode(n[o]);
		return base64encode(e);
	})(f(t, e));
}
function RSA_Public_Encrypt(t) {
	var public_key =
		'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+8wDPpA9orgXJFrZZXjbETVpdaIlV26Auq46+V3olSimyQBpTfKEKKULcaA+cZ5oXUBZ7o1aDVj7IEadBKOH2eCDUydfJ9PABgLduW668s8jrbqQVM2vzMO6F2sW/23Wc4vas0Rez99OCWgqnEnIvmxQuM4lrKO0wcvX026ic2QIDAQAB';
	var Crypt = new RSA.JSEncrypt();
	return Crypt.setPublicKey(public_key), Crypt.public_encryptLong(t, 2, true);
}
//************抠的算法

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const $ = new Env('高德地图签到');
const notify = $.isNode() ? require('./sendNotify') : ''; // 这里是 node（青龙属于node环境）通知相关的
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const _key = 'GD_Val';
const gdVal = process.env.GD_Val ||$.getdata(_key);
var md5 = require('md5');
var message = '', node='', channel, adiu='', userId='', actID='', playID='',Cookie='',sessionid='', adcode='', bizVersion='';
!(async() => {
    if (typeof $request != "undefined") {
        getToken();
        return;
    }
    if (gdVal) {
        let obj = JSON.parse(gdVal);
        userId = obj.userId;
        Cookie = obj.Cookie;
		sessionid = obj.sessionid;
        adiu = obj.adiu;
        adcode = obj.adcode;
        bizVersion = obj.bizVersion
    }
    message += `----------微信小程序签到----------\n`;
    node = 'wechatMP',
    channel = 'h5_common',
    actID = '4zRzeQUM8eb',
    playID = '4zRA5kwg75G';
    await checkIn();
    await signIn();

    message += `----------高德地图签到----------\n`;
    node = 'Amap',
    channel = 'h5_common',
    actID = '4yQc1Mt8nzJ',
    playID = '4yQcyzXdkYU';
    await checkIn();
    await signIn();
    message += `----------支付宝小程序签到----------\n`;
    node = 'alipayMini',
    channel = 'alipay_mini',
    actID = '4zRAarAdbrf',
    playID = '4zRANYHwdgJ';
    await checkIn();
    await signIn();

    await SendMsg(message);
})()
.catch((e) => {
    $.log("", `❌失败! 原因: ${e}!`, "");
})
.finally(() => {
    $.done();
});

function getToken() {
    if ($request && $request.method != 'OPTIONS') {
        let abc = {};
        let obj = JSON.parse($response.body)
        abc.userId = obj.content.uid
        abc.adiu = obj.content.adiu
        abc.adcode = obj.content.adcode
        abc.bizVersion = obj.content.bizVersion
		abc.Cookie = $request.headers['Cookie']
		abc.sessionid = $request.headers['sessionid']
		if(abc.sessionid.length > 28 || abc.Cookie.indexOf('sessionid')!=-1){
			let str = $.setdata(JSON.stringify(abc), _key)
			$.msg($.name, '', '获取签到Cookie成功🎉')
		}
    }
}

function getKey() {
    for (var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678', n = t.length, r = "", i = 0; i < 16; i++)
        r += t.charAt(Math.floor(Math.random() * n));
    return r
}
function getSign(channel) {
    const sign = channel + '@oEEln6dQJK7lRfGxQjlyGthZ4loXcRHR'
    return md5(sign).toUpperCase()
}
function getQuery(adiu,channel, key, sign) {
    let xck = RSA_Public_Encrypt(key);
    let _in = {
        "channel": channel,
        "sign": sign
    };
    _in = Encrypt_Body(Json2Form(_in), key);
    let query = {
        "adiu": adiu,
        "node": "wechatMP",
        "env": "prod",
        "xck_channel": "default",
        "xck": encodeURIComponent(xck),
        "in": encodeURIComponent(_in)
    }
    return Json2Form(query)
}
function getBody(body,key) {
    return Encrypt_Body(Json2Form(body), key)
}
function getHeaders(Cookie,sessionid) {
    return {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 amap/12.13.1.2034 AliApp(amap/12.13.1.2034) NetType/WiFi',
        'Cookie': Cookie,
		'sessionid': sessionid
    }
}

function getShowUrl(query){
    return url= 'https://m5.amap.com/ws/car-place/show?' + query;
}
function getSigUrl(query){
    return url= 'https://m5.amap.com/ws/alice/activity/daily_sign/do_sign?' + query;
}

function getShowBody(node, channel,adiu, userId, sign, actID, playIDs) {
    return {
        "bizVersion": bizVersion,
        "h5version": "6.35.14",
        "platform": "ios",
        "tid": adiu,
        "eId": "",
        "adiu": adiu,
        "diu": adiu,
        "imei": adiu,
        "idfa": adiu,
        "enterprise": "0",
        "ts": new Date().getTime(),
        "uid": userId,
        "userId": userId,
        "channel": channel,
        "dip": "20020",
        "adCode": "",
        "actID": actID,
        "playTypes": "dailySign",
        "playIDs": playIDs,
        "node": node,
        "sign": sign
    }
}
function getSigBody(node, channel, adiu, userId, sign, actID, playID, signTerm, signDay) {
     return{
        "bizVersion": bizVersion,
        "h5version": "6.35.14",
        "platform": "ios",
        "tid": adiu,
        "eId": "",
        "adiu": adiu,
        "diu": adiu,
        "imei": adiu,
        "idfa": adiu,
        "enterprise": "0",
        "ts": new Date().getTime(),
        "uid": userId,
        "userId": userId,
        "channel": channel,
        "dip": "20020",
        "actID": actID,
        "playID": playID,
        "signTerm": signTerm,
        "signType": "1",
        "signDay": signDay,
        "adCode": "",
        "node": node,
        "div": "",
        "sign": sign
    }
}



function checkIn() {
    return new Promise((resove) => {
        key = getKey();
        sign = getSign(channel);
        query = getQuery(adiu,channel, key, sign);
		url = getShowUrl(query)
		body = getShowBody(node, channel, adiu, userId, sign, actID, playID);
        body = getBody(body,key);
        body = 'in=' + encodeURIComponent(body);
        headers = getHeaders(Cookie,sessionid);
        const rest = {url: url,body: body,headers: headers};
        $.post(rest, (err, resp, data) => {
            try {
				var obj = JSON.parse(data);
				if(obj?.code == '1'){
					obj.data.playMap.dailySign.signList.forEach(t => {
						if(t.date == $.time('MM月dd日')){
							signTerm11 = obj.data.playMap.dailySign.signTerm;
							signDay11 = t.day;
							isSign = t.isSign;//isSign = 1 为签到过，懒得管了，让它再提交一次吧
						message += `查询:${t.date} isSign=${isSign}\n`;	
						}
					})
				}else{
					message += `查询:${obj?.message}\n`;
				}
            } catch (e) {
                $.logErr(e,"❌查询：请重新登陆更新Token");
            } finally {
                resove()
            }
        })
    })
}
function signIn() {
    return new Promise((resove) => {
        key = getKey();
        sign = getSign(channel);
        query = getQuery(adiu,channel, key, sign);
		url = getSigUrl(query)
		body = getSigBody(node, channel, adiu, userId, sign, actID, playID, signTerm11, signDay11); 
        body = getBody(body,key);
        body = 'in=' + encodeURIComponent(body);
        headers = getHeaders(Cookie,sessionid);
        const rest = {url: url,body: body,headers: headers};
        $.post(rest, (err, resp, data) => {
            try {
				//console.log(data)
				var obj = JSON.parse(data);
				if(obj?.code == '1'){
					message += `签到:签到成功\n`;
				}else{
					message += `签到:${obj?.message}\n`;
				}
            } catch (e) {
                $.logErr(e,"❌请重新登陆更新Token");
            } finally {
                resove()
            }
        })
    })
}
async function SendMsg(message) {
	if (!message) return;

	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require('./sendNotify');
			await notify.sendNotify($.name, message);
		} else {
			$.msg(message);
		}
	} else {
		console.log(message);
	}
}
//************ENV
function Env(t, e) {
	class s {
		constructor(t) {
			this.env = t;
		}
		send(t, e = 'GET') {
			t = 'string' == typeof t ? { url: t } : t;
			let s = this.get;
			return (
				'POST' === e && (s = this.post),
				new Promise((e, a) => {
					s.call(this, t, (t, s, r) => {
						t ? a(t) : e(s);
					});
				})
			);
		}
		get(t) {
			return this.send.call(this.env, t);
		}
		post(t) {
			return this.send.call(this.env, t, 'POST');
		}
	}
	return new (class {
		constructor(t, e) {
			(this.name = t),
				(this.http = new s(this)),
				(this.data = null),
				(this.dataFile = 'box.dat'),
				(this.logs = []),
				(this.isMute = !1),
				(this.isNeedRewrite = !1),
				(this.logSeparator = '\n'),
				(this.encoding = 'utf-8'),
				(this.startTime = new Date().getTime()),
				Object.assign(this, e),
				this.log('', `🔔${this.name}, 开始!`);
		}
		getEnv() {
			return 'undefined' != typeof $environment && $environment['surge-version']
				? 'Surge'
				: 'undefined' != typeof $environment && $environment['stash-version']
				? 'Stash'
				: 'undefined' != typeof module && module.exports
				? 'Node.js'
				: 'undefined' != typeof $task
				? 'Quantumult X'
				: 'undefined' != typeof $loon
				? 'Loon'
				: 'undefined' != typeof $rocket
				? 'Shadowrocket'
				: void 0;
		}
		isNode() {
			return 'Node.js' === this.getEnv();
		}
		isQuanX() {
			return 'Quantumult X' === this.getEnv();
		}
		isSurge() {
			return 'Surge' === this.getEnv();
		}
		isLoon() {
			return 'Loon' === this.getEnv();
		}
		isShadowrocket() {
			return 'Shadowrocket' === this.getEnv();
		}
		isStash() {
			return 'Stash' === this.getEnv();
		}
		toObj(t, e = null) {
			try {
				return JSON.parse(t);
			} catch {
				return e;
			}
		}
		toStr(t, e = null) {
			try {
				return JSON.stringify(t);
			} catch {
				return e;
			}
		}
		getjson(t, e) {
			let s = e;
			const a = this.getdata(t);
			if (a)
				try {
					s = JSON.parse(this.getdata(t));
				} catch {}
			return s;
		}
		setjson(t, e) {
			try {
				return this.setdata(JSON.stringify(t), e);
			} catch {
				return !1;
			}
		}
		getScript(t) {
			return new Promise(e => {
				this.get({ url: t }, (t, s, a) => e(a));
			});
		}
		runScript(t, e) {
			return new Promise(s => {
				let a = this.getdata('@chavy_boxjs_userCfgs.httpapi');
				a = a ? a.replace(/\n/g, '').trim() : a;
				let r = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout');
				(r = r ? 1 * r : 20), (r = e && e.timeout ? e.timeout : r);
				const [i, o] = a.split('@'),
					n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: 'cron', timeout: r }, headers: { 'X-Key': i, Accept: '*/*' }, timeout: r };
				this.post(n, (t, e, a) => s(a));
			}).catch(t => this.logErr(t));
		}
		loaddata() {
			if (!this.isNode()) return {};
			{
				(this.fs = this.fs ? this.fs : require('fs')), (this.path = this.path ? this.path : require('path'));
				const t = this.path.resolve(this.dataFile),
					e = this.path.resolve(process.cwd(), this.dataFile),
					s = this.fs.existsSync(t),
					a = !s && this.fs.existsSync(e);
				if (!s && !a) return {};
				{
					const a = s ? t : e;
					try {
						return JSON.parse(this.fs.readFileSync(a));
					} catch (t) {
						return {};
					}
				}
			}
		}
		writedata() {
			if (this.isNode()) {
				(this.fs = this.fs ? this.fs : require('fs')), (this.path = this.path ? this.path : require('path'));
				const t = this.path.resolve(this.dataFile),
					e = this.path.resolve(process.cwd(), this.dataFile),
					s = this.fs.existsSync(t),
					a = !s && this.fs.existsSync(e),
					r = JSON.stringify(this.data);
				s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
			}
		}
		lodash_get(t, e, s) {
			const a = e.replace(/\[(\d+)\]/g, '.$1').split('.');
			let r = t;
			for (const t of a) if (((r = Object(r)[t]), void 0 === r)) return s;
			return r;
		}
		lodash_set(t, e, s) {
			return Object(t) !== t
				? t
				: (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
				  (e.slice(0, -1).reduce((t, s, a) => (Object(t[s]) === t[s] ? t[s] : (t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {})), t)[e[e.length - 1]] = s),
				  t);
		}
		getdata(t) {
			let e = this.getval(t);
			if (/^@/.test(t)) {
				const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t),
					r = s ? this.getval(s) : '';
				if (r)
					try {
						const t = JSON.parse(r);
						e = t ? this.lodash_get(t, a, '') : e;
					} catch (t) {
						e = '';
					}
			}
			return e;
		}
		setdata(t, e) {
			let s = !1;
			if (/^@/.test(e)) {
				const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e),
					i = this.getval(a),
					o = a ? ('null' === i ? null : i || '{}') : '{}';
				try {
					const e = JSON.parse(o);
					this.lodash_set(e, r, t), (s = this.setval(JSON.stringify(e), a));
				} catch (e) {
					const i = {};
					this.lodash_set(i, r, t), (s = this.setval(JSON.stringify(i), a));
				}
			} else s = this.setval(t, e);
			return s;
		}
		getval(t) {
			switch (this.getEnv()) {
				case 'Surge':
				case 'Loon':
				case 'Stash':
				case 'Shadowrocket':
					return $persistentStore.read(t);
				case 'Quantumult X':
					return $prefs.valueForKey(t);
				case 'Node.js':
					return (this.data = this.loaddata()), this.data[t];
				default:
					return (this.data && this.data[t]) || null;
			}
		}
		setval(t, e) {
			switch (this.getEnv()) {
				case 'Surge':
				case 'Loon':
				case 'Stash':
				case 'Shadowrocket':
					return $persistentStore.write(t, e);
				case 'Quantumult X':
					return $prefs.setValueForKey(t, e);
				case 'Node.js':
					return (this.data = this.loaddata()), (this.data[e] = t), this.writedata(), !0;
				default:
					return (this.data && this.data[e]) || null;
			}
		}
		initGotEnv(t) {
			(this.got = this.got ? this.got : require('got')),
				(this.cktough = this.cktough ? this.cktough : require('tough-cookie')),
				(this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
				t && ((t.headers = t.headers ? t.headers : {}), void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
		}
		get(t, e = () => {}) {
			switch (
				(t.headers && (delete t.headers['Content-Type'], delete t.headers['Content-Length'], delete t.headers['content-type'], delete t.headers['content-length']),
				t.params && (t.url += '?' + this.queryStr(t.params)),
				this.getEnv())
			) {
				case 'Surge':
				case 'Loon':
				case 'Stash':
				case 'Shadowrocket':
				default:
					this.isSurge() && this.isNeedRewrite && ((t.headers = t.headers || {}), Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })),
						$httpClient.get(t, (t, s, a) => {
							!t && s && ((s.body = a), (s.statusCode = s.status ? s.status : s.statusCode), (s.status = s.statusCode)), e(t, s, a);
						});
					break;
				case 'Quantumult X':
					this.isNeedRewrite && ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
						$task.fetch(t).then(
							t => {
								const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t;
								e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o);
							},
							t => e((t && t.error) || 'UndefinedError')
						);
					break;
				case 'Node.js':
					this.initGotEnv(t),
						this.got(t)
							.on('redirect', (t, e) => {
								try {
									if (t.headers['set-cookie']) {
										const s = t.headers['set-cookie'].map(this.cktough.Cookie.parse).toString();
										s && this.ckjar.setCookieSync(s, null), (e.cookieJar = this.ckjar);
									}
								} catch (t) {
									this.logErr(t);
								}
							})
							.then(
								t => {
									const { statusCode: a, statusCode: r, headers: i, rawBody: o } = t,
										n = s.decode(o, thia.decodes.encoding);
									e(null, { status: a, statusCode: r, headers: i, rawBody: o, body: n }, n);
								},
								t => {
									const { message: a, response: r } = t;
									e(a, r, r && r.rawBody);
								}
							);
			}
		}
		post(t, e = () => {}) {
			const s = t.method ? t.method.toLocaleLowerCase() : 'post';
			switch (
				(t.body && t.headers && !t.headers['Content-Type'] && !t.headers['content-type'] && (t.headers['content-type'] = 'application/x-www-form-urlencoded'),
				t.headers && (delete t.headers['Content-Length'], delete t.headers['content-length']),
				this.getEnv())
			) {
				case 'Surge':
				case 'Loon':
				case 'Stash':
				case 'Shadowrocket':
				default:
					this.isSurge() && this.isNeedRewrite && ((t.headers = t.headers || {}), Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })),
						$httpClient[s](t, (t, s, a) => {
							!t && s && ((s.body = a), (s.statusCode = s.status ? s.status : s.statusCode), (s.status = s.statusCode)), e(t, s, a);
						});
					break;
				case 'Quantumult X':
					(t.method = s),
						this.isNeedRewrite && ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
						$task.fetch(t).then(
							t => {
								const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t;
								e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o);
							},
							t => e((t && t.error) || 'UndefinedError')
						);
					break;
				case 'Node.js':
					this.initGotEnv(t);
					const { url: r, ...i } = t;
					this.got[s](r, i).then(
						t => {
							const { statusCode: s, statusCode: r, headers: i, rawBody: o } = t,
								n = o;
							e(null, { status: s, statusCode: r, headers: i, rawBody: o, body: n }, n);
						},
						t => {
							const { message: s, response: r } = t;
							e(s, r, r && r.rawBody);
						}
					);
			}
		}
		time(t, e = null) {
			const s = e ? new Date(e) : new Date();
			let a = {
				'M+': s.getMonth() + 1,
				'd+': s.getDate(),
				'H+': s.getHours(),
				'm+': s.getMinutes(),
				's+': s.getSeconds(),
				'q+': Math.floor((s.getMonth() + 3) / 3),
				S: s.getMilliseconds()
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + '').substr(4 - RegExp.$1.length)));
			for (let e in a) new RegExp('(' + e + ')').test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ('00' + a[e]).substr(('' + a[e]).length)));
			return t;
		}
		queryStr(t) {
			let e = '';
			for (const s in t) {
				let a = t[s];
				null != a && '' !== a && ('object' == typeof a && (a = JSON.stringify(a)), (e += `${s}=${a}&`));
			}
			return (e = e.substring(0, e.length - 1)), e;
		}
		msg(e = t, s = '', a = '', r) {
			const i = t => {
				switch (typeof t) {
					case void 0:
						return t;
					case 'string':
						switch (this.getEnv()) {
							case 'Surge':
							case 'Stash':
							default:
								return { url: t };
							case 'Loon':
							case 'Shadowrocket':
								return t;
							case 'Quantumult X':
								return { 'open-url': t };
							case 'Node.js':
								return;
						}
					case 'object':
						switch (this.getEnv()) {
							case 'Surge':
							case 'Stash':
							case 'Shadowrocket':
							default: {
								let e = t.url || t.openUrl || t['open-url'];
								return { url: e };
							}
							case 'Loon': {
								let e = t.openUrl || t.url || t['open-url'],
									s = t.mediaUrl || t['media-url'];
								return { openUrl: e, mediaUrl: s };
							}
							case 'Quantumult X': {
								let e = t['open-url'] || t.url || t.openUrl,
									s = t['media-url'] || t.mediaUrl,
									a = t['update-pasteboard'] || t.updatePasteboard;
								return { 'open-url': e, 'media-url': s, 'update-pasteboard': a };
							}
							case 'Node.js':
								return;
						}
					default:
						return;
				}
			};
			if (!this.isMute)
				switch (this.getEnv()) {
					case 'Surge':
					case 'Loon':
					case 'Stash':
					case 'Shadowrocket':
					default:
						$notification.post(e, s, a, i(r));
						break;
					case 'Quantumult X':
						$notify(e, s, a, i(r));
						break;
					case 'Node.js':
				}
			if (!this.isMuteLog) {
				let t = ['', '==============📣系统通知📣=============='];
				t.push(e), s && t.push(s), a && t.push(a), console.log(t.join('\n')), (this.logs = this.logs.concat(t));
			}
		}
		log(...t) {
			t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator));
		}
		logErr(t, e) {
			switch (this.getEnv()) {
				case 'Surge':
				case 'Loon':
				case 'Stash':
				case 'Shadowrocket':
				case 'Quantumult X':
				default:
					this.log('', `❗️${this.name}, 错误!`, t);
					break;
				case 'Node.js':
					this.log('', `❗️${this.name}, 错误!`, t.stack);
			}
		}
		wait(t) {
			return new Promise(e => setTimeout(e, t));
		}
		done(t = {}) {
			const e = new Date().getTime(),
				s = (e - this.startTime) / 1e3;
			switch ((this.log('', `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), this.getEnv())) {
				case 'Surge':
				case 'Loon':
				case 'Stash':
				case 'Shadowrocket':
				case 'Quantumult X':
				default:
					$done(t);
					break;
				case 'Node.js':
					process.exit(1);
			}
		}
	})(t, e);
}
