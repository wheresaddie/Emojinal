
###
    FJS compiler
    coffee fjs.coffee test
###

version = '0.1.0'

debugCompile = no
debugRuntime = no

path = "(eval)"
longPad = ''; for i in [0..25] then longPad += '     '

withStmntStack 	= []
localVarStack   = []
localVarIdxStk  = []
callDepth		= -1

depth 			= 0
haveDbgInspect 	= no

# ew gross, globals, but running with it - nasser
funcOut = ""
resetFuncOut = ->
	funcOut = "\n// File #{path} compiled by FJS version #{version}\n" +
				"// Hacked by Ramsey Nasser December 2013 for the Emojinal Project\n" +
			  "// Generated on #{new Date().toString()[0..20]}\n\n"
resetFuncOut()

########### primitives ############

###
    FJS primitive functions
###

window.Primitives =

# ------------ PRIMITIVES WITH DEFAULT OF 0 ARGUMENTS --------------

	_lbkt__rbkt_: (args...) ->
		if @overrideDefault
			[args]
		else
			[[]]

	_lbrace__rbrace_: (args...) ->
		if @overrideDefault
			obj = {}
			i = 0
			while i < args.length - 1
				obj[args[i].toString()] = args[i+1]
				i += 2
			obj
		else
			{}


# ------------ PRIMITIVES WITH DEFAULT OF 1 ARGUMENT --------------

	_dot_: (args...) ->
		if @overrideDefault
			console.log args...
		else
			console.log args[0]
			args[1..]

	dup: (args...) ->
		if @overrideDefault
			args.concat args
		else
			args[0..0].concat args

	drop: (args...) ->
		if @overrideDefault
			undefined
		else
			args[1..]

	truthy: (args...) ->
		if @overrideDefault
			for arg, i in args then if not args[i] then return false
			true
		else
			[ not not args[0] ].concat args[1..]

	not: (args...) ->
		if @overrideDefault
			for arg, i in args then args[i] = not args[i]
			args
		else
			[ not args[0] ].concat args[1..]

# ------------ PRIMITIVES WITH DEFAULT OF 2 ARGUMENTS --------------

	# dups second or last arg onto stack top
	over: (args...) ->
		if @overrideDefault
			args[-1..-1].concat args
		else
			args[1..1].concat args

	# opposite of rot when more than 2 args
	swap: (args...) ->
		if @overrideDefault
			args[1..-1].concat args[0..0]
		else
			[args[1], args[0]]

	get: (args...) ->
		obj = args[0]
		if @overrideDefault
			res = []
			for args in args[1..]
				res.push obj[ arg ]
			res
		else
			obj[ args[1] ]

	_plus_: (args...) ->
		if @overrideDefault
			haveStr = no
			for arg in args then if typeof arg is 'string' then haveStr = yes; break
			total = (if haveStr then '' else 0)
			for arg in args then total += arg
			total
		else
#			console.log '_plus_ def', args, [ args[0] + args[1] ]
			if args.length < 2 then args
			else [ args[0] + args[1] ].concat args[2..]

	# negate if args.length is 1
	# else replace all args below top with top - arg
	_dash_: (args...) ->
		if @overrideDefault and args.length > 2
			total = +args[0]
			for arg in args[1..] then total -= arg
			total
		else
			if args.length < 2 then args
			else [ args[0] - args[1] ].concat args[2..]

	_star_: (args...) ->
		if @overrideDefault and args.length > 2
			total = +args[0]
			for arg, i in args[1..] then total *= arg
			total
		else
			if args.length < 2 then args
			else [ args[0] * args[1] ].concat args[2..]

	_slash_: (args...) ->
		if @overrideDefault and args.length > 2
			total = +args[0]
			for arg in args[1..] then total /= arg
			total
		else
			if args.length < 2 then args
			else [ args[0] / args[1] ].concat args[2..]

	or: (args...) ->
		if @overrideDefault
			for arg, i in args then if args[i] then return true
			false
		else
			if args.length < 2 then args
			else [ args[0] || args[1] ].concat args[2..]

	and: (args...) ->
		if @overrideDefault
			for arg, i in args then if not args[i] then return false
			true
		else
			if args.length < 2 then args
			else [ args[0] && args[1] ].concat args[2..]

	# checks if all or top two args are equal
	_eq_: (args...) ->
		if @overrideDefault
			top = args[0]
			for arg, i in args[1..] then if top isnt arg then return false
			true
		else
			if args.length < 2 then true
			else [ args[0] is args[1] ].concat args[2..]

	_lt_: (args...) ->
		if @overrideDefault
			for arg, i in args[1..] then if arg[i-1] >= arg then return false
			true
		else
			if args.length < 2 then false
			else [ args[0] < args[1] ].concat args[2..]

	_gt_: (args...) ->
		if @overrideDefault
			for arg, i in args[1..] then if arg[i-1] <= arg then return false
			true
		else
			if args.length < 2 then false
			else [ args[0] > args[1] ].concat args[2..]

	_if_: (args...) ->
		console.log '_if_', args
		if typeof args[0] is 'function' and args[0].call @ or args[0]
			args[1].apply @, args[2..]
		undefined

	doif: (args...) ->
		if typeof args[1] is 'function' and args[1].call @ or args[1]
			args[0].apply @, args[2..]
		undefined

	_while_: (args...) ->
		while args[0].call @ then args[1].apply @, args[2..]
		undefined

	repeat: (args...) ->
		loop
			args[0].apply @, args[1..]
			if @pop() is false then break
		undefined

	dowhile: (args...) ->
		while args[1].call @ then args[0].apply @, args[2..]
		undefined

	map: (args...) ->
		res = []
		for item in args[1]
			args[0].call @, item
			res.push @pop()
		[res]

	each: (args...) ->
		res = []
		for item in args[1]
			args[0].call @, item
			if (resItem = @pop()) is false then break
			res.push resItem
		[res]

# ------------ PRIMITIVES WITH DEFAULT OF 3 ARGUMENTS --------------
	rot: (args...) ->
		if @overrideDefault
			args[-1..-1].concat args[0..-2]
		else
			args[2..2].concat args[0..1], args[3..]

	set: (args...) ->
		obj = args[0]
		if @overrideDefault
			i = 0
			while i < args.length - 1
				obj[args[i]] = args[i+1]
				i += 2
			res
		else
			obj[ args[1] ] = args[2]


# ------------ PRIMITIVES WITH DEFAULT OF ALL ARGUMENTS --------------

	_new_: (args...) ->
		constructor = args[0]
		argsArr = []
		for arg, i in args[1..] then argsArr.push 'args[' + i + ']'
		eval 'new constructor(' + argsArr.join(',') + ')'



########### runtime ############

# a fjs function (@codeFuncSegs array) invocation
# includes execution ptr (@segIdx) and datastack (@stack)
class Frame
	constructor: ( @codeFuncSegs, @segIdx = 0, @stack = [], @args = [] ) ->

	clone: -> new Frame @codeFuncSegs, @segIdx, @stack.slice 0, @args.slice 0

# execution engine
class Context

	constructor: (@curFrame = null) ->
		@frames = []
		@callbacksPending = 0

	clone: ->
		newCtxt = new Context @curFrame.clone()

	stack: -> @curFrame.stack

	moveArgsToStack: (n) ->
		if not (frame2 = @frames[-1..-1][0]) then return
		if not n
			@curFrame.stack = frame2.args.concat @curFrame.stack
			frame2.args = []
		else
			@curFrame.stack = frame2.args.splice(0, n).concat @curFrame.stack

	setArgs: (args) -> @curFrame.args = Array.prototype.slice.call args

	pop: -> @curFrame.stack.shift()

	popAll: -> stk = @curFrame.stack; @curFrame.stack = []; stk

	popN: (n) ->
		n or= @curFrame.stack.length
		@curFrame.stack.splice 0, n

	push: (v) -> @curFrame.stack.unshift v

	new: (Class, args) ->
		(->
			construct = -> Class.apply this, args
			construct.prototype = Class.prototype
			new construct
		)()

	pushArray: (array) -> @curFrame.stack = array.concat @curFrame.stack

	pushReturnValue: (val) ->
		if typeof val is 'undefined' then return
		if val instanceof Array
#			console.log 'pushReturnValue Array', val
			@pushArray val
		else if toString.call(val) is '[object Arguments]'
			@pushArray Array.prototype.slice call val
		else @curFrame.stack.unshift val

	pushArgsAndExec: (f, n = @curFrame.stack.length) ->
		@overrideDefault = true
		@pushReturnValue f.apply @, @curFrame.stack.splice 0, n
		delete @overrideDefault

	execOrPush: (word) ->
		if typeof word is 'function'
			stk = @curFrame.stack
			@curFrame.stack = []
#			console.log 'execOrPush function', stk
			@pushReturnValue word.apply @, stk
		else
			@push word

	pushCB: (debugFunc) ->
		@curFrame.stack.unshift @_callback.bind @, debugFunc
		@callbacksPending++

	_callback: (debugFunc, args...) ->
		if --@callbacksPending > 0 then return
		ctxt = (if @callbacksPending is 0 then @ else ctxt = @savedCtxt)
		@savedCtxt = ctxt.clone()
		ctxt.curFrame.stack = args.concat ctxt.curFrame.stack
		if debugFunc
			console.log()
			debugFunc.call ctxt, '<callback>'
		ctxt._run()

	funcCall: (debugFunc, segments) ->
		@frames.push @curFrame
		@curFrame = new Frame segments
		if debugFunc then debugFunc.call @, '('
		@_run()

	_run: (args) ->
		@curFrame.codeFuncSegs[@curFrame.segIdx++]?.call @

	wait: ->
		if @callbacksPending < 1 then @_run()
		# else ends js tick execution until next cb

	funcReturn: ->
		stack = @curFrame.stack
		if (@curFrame = @frames.pop())
			@curFrame.stack = stack.concat @curFrame.args, @curFrame.stack

window.Context = new Context

########### compile function ############

compileFunc = (funcSrc, pfx) ->


	#################### span routines #####################

	getString = (word, regex) ->
		delim = word[0]
		out = delim
		i = regex.lastIndex

		while i < funcSrc.length
			chr0 = funcSrc[i]
			chr1 = funcSrc[i+1] ? ' '

			if chr0 is '\\'
				out += chr0 + chr1
				i += 2
				continue

			out += chr0

			if chr0 is delim and /\s/.test chr1
				regex.lastIndex = i + 1
				return out

			i++

		throw new Exception 'Unterminated string'

	getFuncString = (word, regex) ->
		out = word

		i = regex.lastIndex

		while i < funcSrc.length
			chr0 = funcSrc[i]
			chr1 = funcSrc[i+1] ? ' '
			chr2 = funcSrc[i+2] ? ' '
			chr3 = funcSrc[i+3] ? ' '

			if chr0 is '\\'
				out += chr0 + chr1
				i += 2
				continue

			if /\s/.test chr0
				if chr1 is '/' and chr2 is '/'
					while ++i < funcSrc.length and funcSrc[i] isnt '\n' then
					continue

				else if chr1 in ['"', "'", "`"]
					regex.lastIndex = i + 2
					out += chr0 + (gs = getString chr1, regex)
					i = regex.lastIndex
					continue

				else if chr1 is '(' and /\s/.test(chr2)
					regex.lastIndex = i + 2
					out += chr0 + getFuncString '(', regex
					i = regex.lastIndex
					continue

				else if chr1 is ':' and chr2 is '(' and /\s/.test(chr3)
					regex.lastIndex = i + 3
					out += chr0 + getFuncString ':(', regex
					i = regex.lastIndex
					continue

				else if chr1 is ')'
					wsIdx = i
					while ++wsIdx < funcSrc.length and /\S/.test funcSrc[wsIdx] then
					regex.lastIndex = wsIdx
					return out + funcSrc[i...wsIdx]

			out += chr0
			i++

		throw new Exception 'Unmatched left paren'


	#################### parse words routine #####################

	parseWords = (wordRegEx) ->
		wordsInLine = []
		matches     = true

		lastIndex = wordRegEx.lastIndex

		while wordsInLine.length is 0 and matches

			while (matches = wordRegEx.exec funcSrc)
				[_, wordMatch, whiteSpace] = matches

				if (comment = (wordMatch[0..1] is '//'))
					eolRegex = /\n|$/g
					eolRegex.lastIndex = wordRegEx.lastIndex
					eolRegex.exec funcSrc
					wordRegEx.lastIndex = eolRegex.lastIndex

				else
					# string constant
					if wordMatch[0] in ['"', "'", "`"]
						wordRegEx.lastIndex =
							wordRegEx.lastIndex - wordMatch.length - whiteSpace.length + 1
						wordMatch = getString wordMatch, wordRegEx
						whiteSpace = funcSrc[wordRegEx.lastIndex]

					# function string
					else if /^:?\($/.test wordMatch
						wordRegEx.lastIndex = wordRegEx.lastIndex - whiteSpace.length
						wordMatch  = getFuncString wordMatch, wordRegEx
						whiteSpace = funcSrc[wordRegEx.lastIndex]

					wordsInLine.unshift wordMatch

				lastIndex = wordRegEx.lastIndex
				if comment or not whiteSpace or /\n/.test whiteSpace
					break

			wordRegEx.lastIndex = lastIndex

		wordsInLine

	#################### emit routines #####################

	out = (word, line, dbgOk = yes) ->
		str = ''; for i in [0...depth] then str += '  '
		str += line
		if word
			while str.length  < 75 then str += ' '
			dbgStr = ''
			if debugRuntime and dbgOk
				dbgStr = longPad + 'fjsInspect.call(this, "' + word.replace(/"/g, "'") + '");'
			funcOut += str + ' /* ' + word + ' */' + dbgStr + '\n'
		else
			funcOut += str + '\n'

	outFunc = (src, exec = yes) ->
		n = ''
		if (m = /\)<(\d+)$/.exec src) then n = '0, ' + m[1]

		if exec
			if n
				out null, 'var fjs_argsArr = this.curFrame.stack.splice(' + n + ');'
			else
				out null, 'var fjs_argsArr = this.curFrame.stack;'
				out null, 'this.curFrame.stack = [];'
			out null, 'this.pushReturnValue( (function(){'
		else
			out null, 'this.push( function(){'

		depth++

		out '(', 'this.setArgs(arguments);'

		if (m = /^:?\((.*)\)<?(\d+)?$/.exec src) then src = m[1]

		compileFunc src, 'this'

		depth--
#		out null, '}'

		if exec
			out '()', '} ).apply( this, fjs_argsArr ));'
		else
			out null, '} );'

	#################### emit debug routine at top of file #####################

	if debugRuntime and not haveDbgInspect
		out null, "function fjsInspVal(fjs_stkDmp,fjs_item) {\n" +
				  "   fjs_stkDmp.push(\n" +
				  "     fjs_item === null ? 'null' : \n" +
				  "     typeof fjs_item == 'string'  ? '\"'+fjs_item.replace(/\\s/g,' ')+'\"'          : \n" +
				  "     typeof fjs_item == 'number'  ?  fjs_item                   : \n" +
				  "     fjs_item instanceof Function ? 'function'                  : \n" +
				  "     fjs_item instanceof Array    ? '['+fjs_item.toString()+']' : \n" +
				  "     fjs_item instanceof Boolean  ? fjs_item.toString()         : \n" +
				  "     (fjs_m = /^function\\s(.*?)\\(\\s/.exec(fjs_item.constructor)) ? fjs_m[1] :\n" +
				  "     fjs_item.toString()\n" +
				  "   );\n" +
				  "}\n" +

		out null, "function fjsInspect(fjs_word) {\n" +
				  "  fjs_word = fjs_word.replace(/\\s/g,' ');" +
				  "  while(fjs_word.length < 25) fjs_word += ' ';\n" +
				  "  fjs_stkDmp = []; fjs_argDmp = []; fjs_frame = this.curFrame;\n" +
				  "  if(fjs_frame) {\n" +
				  "    fjs_stk = fjs_frame.stack; fjs_stkLen = fjs_stk.length;\n" +
				  "    for(fjs_i=0; fjs_i<fjs_stkLen; fjs_i++)\n" +
				  "      fjsInspVal(fjs_stkDmp,fjs_stk[fjs_i]);\n" +
				  "    fjs_arg = fjs_frame.args; fjs_argLen = fjs_arg.length;\n" +
				  "    for(fjs_i=0; fjs_i<fjs_argLen; fjs_i++)\n" +
				  "      fjsInspVal(fjs_argDmp,fjs_arg[fjs_i]);\n" +
				  "  }\n" +
				  "  console.log( 'dbg: ' + fjs_word, '[ '+fjs_stkDmp.join(', ')+' ] /',\n" +
				  "               '( '+fjs_argDmp.join(', ')+' )')\n" +
				  "}\n"
		haveDbgInspect = yes

	#################### find new local vars #####################

	localVarIndexes = {}

	wordRegEx = new RegExp '(\\S+)(\\s*)', 'g'
	wordIdx   = -1

	while (wordsInLine = parseWords wordRegEx).length
		for word in wordsInLine
			wordIdx++
			if word not in ['=', '>=', '<=', 'not='] and
					word[-1..-1] is '=' and
					not /\./.test word
				word = word[0..-2]
				exists = no
				if callDepth >= 0
					for varSet, dpth in localVarStack[0..callDepth]
						for wrd, idx of varSet when idx < localVarIdxStk[dpth]
							if wrd is word
								exists = yes
								break
				if not exists and not localVarIndexes[word]
					localVarIndexes[word] = wordIdx

	#################### start new call stack level #####################

	withStmntStack.push []
	localVarStack .push localVarIndexes
	localVarIdxStk.push -1
	callDepth++

#	console.log {callDepth, localVarIdxStk, localVarStack}

	#################### emit function overhead #####################

	localVarsArr = []
	for localVar of localVarIndexes then localVarsArr.push encodeSymbol localVar
	if localVarsArr.length
		out null, 'var ' + localVarsArr.join(', ') + ';'

	out null, pfx + '.funcCall( ' + (if debugRuntime then 'fjsInspect,' else 'null,'), no
	depth++

	out null, '['
	depth++

	out null, 'function() {'
	depth++

	#################### emit js code word by word #####################

	wordRegEx = new RegExp '(\\S+)(\\s*)', 'g'

	while (wordsInLine = parseWords wordRegEx).length

		for word in wordsInLine
			localVarIdxStk[callDepth]++

			if debugCompile then console.log '- word:', localVarIdxStk[callDepth], word[0..60]

			if word[0] in ['"', "'"]
				out word, 'this.push( ' + word + ' );'

			else if word[0] is "`"
				out word, 'this.push( ' + word[1..-2] + ' );'

			else if (m = /^(:)?\(\s/.exec word)
				outFunc word, not m[1]

			else if word[0..4] is 'with:'
				topIdx = withStmntStack.length-1
				sym = encodeSymbol word[5..]
				withStmntStack[topIdx].push sym
				out null, 'with( ' + sym + ' ) {'
				depth++

			else if word[0..6] is 'typeof:'
				sym = encodeSymbol word[7..]
				out word, 'this.push( typeof ' + sym + ' );'
				depth++

			else if word[0..10] is 'instanceof:'
				sym = encodeSymbol word[11..]
				out word, 'this.push( this.pop() instanceof ' + sym + ' );'
				depth++

			else if word is 'cb'
				out word, 'this.pushCB(' +
							(if debugRuntime then 'fjsInspect' else 'null') + ');'

			else if word is 'wait'
				out word, 'this.wait();'
				for i in withStmntStack[withStmntStack.length-1] then depth--; out null, '}'
				depth--
				out null, '}, function() {'
				depth++
				for w in  withStmntStack[withStmntStack.length-1]
					out null, 'with( ' + encodeSymbol(w) + ' ) {'
					depth++

			# literal string
			else if word[0] is ':'
				rest    = word[1..]
				restEsc = rest.replace /"/g, '\\"'
				out word, 'this.push( typeof ' + rest + ' == "function" ? ' + rest +
							' : "' + restEsc + '" );'

			# var assignment, xxx=
			else if word.length > 1 and word[-1..-1] is '='
				out word, (sym = encodeSymbol(word[0..-2])) + ' = this.pop();'

			# move arguments to inner stack, @<n
			else if (matches = /^@(@|(\d*))$/.exec word)
				ltn = switch
					when not matches[1] then 1
					when     matches[2] then matches[2]
					else ''
				out word, 'this.moveArgsToStack(' + ltn + ');'

			# lt modifier to function, xxx<n
			else if (m = /^(\S+)<(\d*)$/.exec word)
				[_, front, ltn] = m
				ltn or= 'null'
				out word, 'this.pushArgsAndExec( ' + encodeSymbol(front) + ', ' + ltn + ' );'

			# dot modifier to var or function, xxx.
			else if (m = /^(\S+)\.$/.exec word)
				if not (front = m[1])
					out '.', 'this.execOrPush( _dot_ );'
				else
					sym = encodeSymbol front
					out null, 'fjs_ctxtObj = this.pop();'
					out null, 'fjs_val = fjs_ctxtObj.' + sym + ';'
					out null, 'if(typeof fjs_val == "function")'
					out null, '  fjs_val = fjs_val.apply('
					out null, '      fjs_ctxtObj, this.curFrame.stack );'
					out null, '  this.curFrame.stack = [];'
					out word, 'this.pushReturnValue(fjs_val);'

			else
				out word, 'this.execOrPush( ' + encodeSymbol(word) + ' );'

	out ')', 'this.funcReturn();'
	for i in withStmntStack[withStmntStack.length-1] then depth--; out null, '}'

	depth--
	out null, '}'

	depth--
	out null, ']'

	withStmntStack.pop()
	localVarStack.pop()
	localVarIdxStk.pop()
	callDepth--

	depth--
	out null, ');'
	if debugCompile then console.log '- word: ' + (localVarIdxStk[callDepth]+1) + ' )'


############################ SYMBOL ENCODING ############################

nameByChar =
	'!': 'bang',   '"': 'quot',   '#': 'hash',   '%': 'pcent', '&':  'amp',    "'": 'tick'
	'(': 'lparen', ')': 'rparen', '*': 'star',   '+': 'plus',  ',':  'comma',  '-': 'dash'
	'/': 'slash',  ':': 'colon',  ';': 'semi',  '<':  'lt',     '=': 'eq'
	'>': 'gt',     '?': 'qmark',  '@': 'at',     '[': 'lbkt',  '\\': 'bslsh',  ']': 'rbkt'
	'^': 'caret',  '`': 'btick',  '{': 'lbrace', '|': 'pipe',  '}':  'rbrace', '~': 'tilda'

charByName =
	'bang'  : '!', 'quot'  : '"', 'hash'  : '#', 'pcent' : '%', 'amp'   : '&', 'tick'  : "'"
	'lparen': '(', 'rparen': ')', 'star'  : '*', 'plus'  : '+', 'comma' : ',', 'dash'  : '-'
	'slash' : '/', 'colon' : ':', 'semi'  : ';', 'lt'    : '<', 'eq'    : '='
	'gt'    : '>', 'qmark' : '?', 'at'    : '@', 'lbkt'  : '[', 'bslsh' : '\\','rbkt'  : ']'
	'caret' : '^', 'btick' : '`', 'lbrace': '{', 'pipe'  : '|', 'rbrace': '}', 'tilda' : '~'

symByWord =  throw: '_throw_', if: '_if_', while: '_while_', '.': '_dot_', new: '_new_'

wordBySym = _throw_: 'throw', _if_: 'if', _while_: 'while',  _dot_: '.', _new_: 'new'

encodeSymbol = (str) ->
	if str.length is 0 then return str
	if str[0] is '`' then return str[1..]
	if str of symByWord then return symByWord[str];

	out = '';
	for char in str
		if (name = nameByChar[char]) then out += '_' + name + '_'
		else out += char

	if isNaN(out) and /^\d/.test out then out = '_num_' + out

	out

decodeSymbol = (str) ->
	if str of wordBySym then return wordBySym[str];

	for name, char of charByName
		regex = new Regexp '_' + name + '_', 'g'
		str = str.replace regex, char
	str

window.FJS ?= {}
window.FJS.compile = (src) ->
	resetFuncOut()
	compileFunc "with:Primitives\n\n" + src, "Context"
	funcOut

window.FJS.execute = (src) ->
	window.eval @compile(src)