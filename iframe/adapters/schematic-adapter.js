/**
 * 原理图适配器
 * 处理原理图和符号相关API
 */
class SchematicAdapter extends BaseAdapter {
	constructor() {
		super();
		this.initTools();
	}

	initTools() {
		// 选择控制相关工具
		this.registerTool('getSelectedPrimitives', '获取选中图元的所有参数', () => this.getSelectedPrimitives());

		this.registerTool('getSelectedPrimitives_PrimitiveId', '获取选中图元的ID', () => this.getSelectedPrimitives_PrimitiveId());

		this.registerTool('getCurrentMousePosition', '获取当前鼠标在画布上的位置', () => this.getCurrentMousePosition());

		this.registerTool('getAllSelectedPrimitives', '查询所有已选中图元的图元对象', () => this.getAllSelectedPrimitives());

		this.registerTool('getAllSelectedPrimitives_PrimitiveId', '查询所有已选中图元的图元ID', () => this.getAllSelectedPrimitives_PrimitiveId());

		this.registerTool('doSelectPrimitives', '使用图元ID选中图元', (params) => this.doSelectPrimitives(params));

		this.registerTool('doCrossProbeSelect', '进行交叉选择', (params) => this.doCrossProbeSelect(params));

		this.registerTool('clearSelected', '清除所有选中状态', () => this.clearSelected());

		// 文档操作相关工具
		this.registerTool('importChanges', '从PCB导入变更', () => this.importChanges());

		this.registerTool('saveDocument', '保存文档', () => this.saveDocument());

		// 设计规则检查相关工具
		this.registerTool('checkDrc', '检查DRC规则', (params) => this.checkDrc(params));

		// 事件相关工具
		this.registerTool('addMouseEventListener', '新增鼠标事件监听', (params) => this.addMouseEventListener(params));

		this.registerTool('removeEventListener', '移除事件监听', (params) => this.removeEventListener(params));

		this.registerTool('isEventListenerAlreadyExist', '查询事件监听是否存在', (params) => this.isEventListenerAlreadyExist(params));

		// 生产资料相关工具
		this.registerTool('getBomFile', '获取BOM文件', (params) => this.getBomFile(params));

		this.registerTool('getNetlistFile', '获取网表文件', (params) => this.getNetlistFile(params));

		this.registerTool('placeComponentsOrder', '元件下单', (params) => this.placeComponentsOrder(params));

		this.registerTool('placeSmtComponentsOrder', 'SMT元件下单', (params) => this.placeSmtComponentsOrder(params));

		// 网表相关工具
		this.registerTool('getNetlist', '获取网表', (params) => this.getNetlist(params));

		this.registerTool('setNetlist', '更新网表', (params) => this.setNetlist(params));

		// 图元操作相关工具
		this.registerTool('getPrimitiveTypeByPrimitiveId', '获取指定ID的图元类型', (params) => this.getPrimitiveTypeByPrimitiveId(params));

		this.registerTool('getPrimitiveByPrimitiveId', '获取指定ID的图元属性', (params) => this.getPrimitiveByPrimitiveId(params));

		this.registerTool('getPrimitivesBBox', '获取图元的边界框', (params) => this.getPrimitivesBBox(params));

		// 圆弧图元操作
		this.registerTool('createArc', '创建圆弧图元', (params) => this.createArc(params));
		this.registerTool('deleteArc', '删除圆弧图元', (params) => this.deleteArc(params));
		this.registerTool('modifyArc', '修改圆弧图元', (params) => this.modifyArc(params));
		this.registerTool('getArc', '获取圆弧图元', (params) => this.getArc(params));
		this.registerTool('getAllArcPrimitiveId', '获取所有圆弧图元ID', () => this.getAllArcPrimitiveId());
		this.registerTool('getAllArc', '获取所有圆弧图元', () => this.getAllArc());

		// 总线图元操作
		this.registerTool('createBus', '创建总线图元', (params) => this.createBus(params));
		this.registerTool('deleteBus', '删除总线图元', (params) => this.deleteBus(params));
		this.registerTool('modifyBus', '修改总线图元', (params) => this.modifyBus(params));
		this.registerTool('getBus', '获取总线图元', (params) => this.getBus(params));
		this.registerTool('getAllBusPrimitiveId', '获取所有总线图元ID', () => this.getAllBusPrimitiveId());
		this.registerTool('getAllBus', '获取所有总线图元', () => this.getAllBus());

		// 圆图元操作
		this.registerTool('createCircle', '创建圆图元', (params) => this.createCircle(params));
		this.registerTool('deleteCircle', '删除圆图元', (params) => this.deleteCircle(params));
		this.registerTool('modifyCircle', '修改圆图元', (params) => this.modifyCircle(params));
		this.registerTool('getCircle', '获取圆图元', (params) => this.getCircle(params));
		this.registerTool('getAllCirclePrimitiveId', '获取所有圆图元ID', () => this.getAllCirclePrimitiveId());
		this.registerTool('getAllCircle', '获取所有圆图元', () => this.getAllCircle());

		// 器件图元操作
		this.registerTool('setNetFlagComponentUuid_Power', '设置Power网络标识器件UUID', (params) => this.setNetFlagComponentUuid_Power(params));
		this.registerTool('setNetFlagComponentUuid_Ground', '设置Ground网络标识器件UUID', (params) => this.setNetFlagComponentUuid_Ground(params));
		this.registerTool('setNetFlagComponentUuid_AnalogGround', '设置AnalogGround网络标识器件UUID', (params) =>
			this.setNetFlagComponentUuid_AnalogGround(params),
		);
		this.registerTool('setNetFlagComponentUuid_ProtectGround', '设置ProtectGround网络标识器件UUID', (params) =>
			this.setNetFlagComponentUuid_ProtectGround(params),
		);
		this.registerTool('setNetPortComponentUuid_IN', '设置IN网络端口器件UUID', (params) => this.setNetPortComponentUuid_IN(params));
		this.registerTool('setNetPortComponentUuid_OUT', '设置OUT网络端口器件UUID', (params) => this.setNetPortComponentUuid_OUT(params));
		this.registerTool('setNetPortComponentUuid_BI', '设置BI网络端口器件UUID', (params) => this.setNetPortComponentUuid_BI(params));
		this.registerTool('createComponent', '创建器件', (params) => this.createComponent(params));
		this.registerTool('createNetFlag', '创建网络标识', (params) => this.createNetFlag(params));
		this.registerTool('createNetPort', '创建网络端口', (params) => this.createNetPort(params));
		this.registerTool('createShortCircuitFlag', '创建短接标识', (params) => this.createShortCircuitFlag(params));
		this.registerTool('deleteComponent', '删除器件', (params) => this.deleteComponent(params));

		// 矩形图元操作
		this.registerTool('createRectangle', '创建矩形图元', (params) => this.createRectangle(params));
		this.registerTool('deleteRectangle', '删除矩形图元', (params) => this.deleteRectangle(params));
		this.registerTool('modifyRectangle', '修改矩形图元', (params) => this.modifyRectangle(params));
		this.registerTool('getRectangle', '获取矩形图元', (params) => this.getRectangle(params));
		this.registerTool('getAllRectanglePrimitiveId', '获取所有矩形图元ID', () => this.getAllRectanglePrimitiveId());
		this.registerTool('getAllRectangle', '获取所有矩形图元', () => this.getAllRectangle());

		// 文本图元操作
		this.registerTool('createText', '创建文本图元', (params) => this.createText(params));
		this.registerTool('deleteText', '删除文本图元', (params) => this.deleteText(params));
		this.registerTool('modifyText', '修改文本图元', (params) => this.modifyText(params));
		this.registerTool('getText', '获取文本图元', (params) => this.getText(params));
		this.registerTool('getAllTextPrimitiveId', '获取所有文本图元ID', () => this.getAllTextPrimitiveId());
		this.registerTool('getAllText', '获取所有文本图元', () => this.getAllText());
	}

	/**
	 * 获取选中图元的所有参数
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getSelectedPrimitives() {
		try {
			// 使用SCH_SelectControl类获取选中图元的所有参数
			const primitives = await eda.sch_SelectControl.getSelectedPrimitives();
			return this.formatSuccess(primitives, `获取到 ${primitives ? primitives.length : 0} 个选中图元参数`);
		} catch (error) {
			return this.formatError(error, '获取选中图元参数失败');
		}
	}

	/**
	 * 获取选中图元的ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getSelectedPrimitives_PrimitiveId() {
		try {
			// 使用SCH_SelectControl类获取选中图元的ID
			const primitiveIds = await eda.sch_SelectControl.getSelectedPrimitives_PrimitiveId();
			return this.formatSuccess(primitiveIds, `获取到 ${primitiveIds ? primitiveIds.length : 0} 个选中图元ID`);
		} catch (error) {
			return this.formatError(error, '获取选中图元ID失败');
		}
	}

	/**
	 * 获取当前鼠标在画布上的位置
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getCurrentMousePosition() {
		try {
			// 使用SCH_SelectControl类获取当前鼠标在画布上的位置
			const position = await eda.sch_SelectControl.getCurrentMousePosition();
			return this.formatSuccess(position, position ? '成功获取鼠标位置' : '当前鼠标不在画布上');
		} catch (error) {
			return this.formatError(error, '获取鼠标位置失败');
		}
	}

	/**
	 * 查询所有已选中图元的图元对象
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllSelectedPrimitives() {
		try {
			// 使用SCH_SelectControl类获取所有已选中图元的图元对象
			const primitives = await eda.sch_SelectControl.getAllSelectedPrimitives();
			return this.formatSuccess(primitives, `获取到 ${primitives ? primitives.length : 0} 个选中图元对象`);
		} catch (error) {
			return this.formatError(error, '获取选中图元对象失败');
		}
	}

	/**
	 * 查询所有已选中图元的图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllSelectedPrimitives_PrimitiveId() {
		try {
			// 使用SCH_SelectControl类获取所有已选中图元的图元ID
			const primitiveIds = await eda.sch_SelectControl.getAllSelectedPrimitives_PrimitiveId();
			return this.formatSuccess(primitiveIds, `获取到 ${primitiveIds ? primitiveIds.length : 0} 个选中图元ID`);
		} catch (error) {
			return this.formatError(error, '获取选中图元ID失败');
		}
	}

	/**
	 * 使用图元ID选中图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>} params.primitiveIds - 图元ID或图元ID数组
	 * @returns {Promise<Object>} - 执行结果
	 */
	async doSelectPrimitives(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供图元ID');
			}

			// 使用SCH_SelectControl类选中指定图元
			const result = await eda.sch_SelectControl.doSelectPrimitives(params.primitiveIds);
			return this.formatSuccess(result, result ? '成功选中图元' : '选中图元失败');
		} catch (error) {
			return this.formatError(error, '选中图元失败');
		}
	}

	/**
	 * 进行交叉选择
	 * @param {Object} params - 参数对象
	 * @param {Array<string>} params.components - 器件位号（可选）
	 * @param {Array<string>} params.pins - 器件位号_引脚编号（可选）
	 * @param {Array<string>} params.nets - 网络名称（可选）
	 * @param {boolean} params.highlight - 是否高亮（可选）
	 * @param {boolean} params.select - 是否选中（可选）
	 * @returns {Promise<Object>} - 执行结果
	 */
	async doCrossProbeSelect(params) {
		try {
			// 使用SCH_SelectControl类进行交叉选择
			const result = await eda.sch_SelectControl.doCrossProbeSelect(
				params.components,
				params.pins,
				params.nets,
				params.highlight,
				params.select,
			);
			return this.formatSuccess(result, result ? '交叉选择成功' : '交叉选择失败');
		} catch (error) {
			return this.formatError(error, '交叉选择失败');
		}
	}

	/**
	 * 清除所有选中状态
	 * @returns {Promise<Object>} - 执行结果
	 */
	async clearSelected() {
		try {
			// 使用SCH_SelectControl类清除所有选中状态
			const result = await eda.sch_SelectControl.clearSelected();
			return this.formatSuccess(result, result ? '成功清除选中状态' : '清除选中状态失败');
		} catch (error) {
			return this.formatError(error, '清除选中状态失败');
		}
	}

	/**
	 * 从PCB导入变更
	 * @returns {Promise<Object>} - 执行结果
	 */
	async importChanges() {
		try {
			// 使用SCH_Document类从PCB导入变更
			const result = await eda.sch_Document.importChanges();
			return this.formatSuccess(result, result ? '成功从PCB导入变更' : '从PCB导入变更失败');
		} catch (error) {
			return this.formatError(error, '从PCB导入变更失败');
		}
	}

	/**
	 * 保存文档
	 * @returns {Promise<Object>} - 执行结果
	 */
	async saveDocument() {
		try {
			// 使用SCH_Document类保存文档
			const result = await eda.sch_Document.save();
			return this.formatSuccess(result, result ? '文档保存成功' : '文档保存失败');
		} catch (error) {
			return this.formatError(error, '文档保存失败');
		}
	}

	/**
	 * 检查DRC规则
	 * @param {Object} params - 参数对象
	 * @param {boolean} [params.strict=false] - 是否严格检查，严格检查时存在Warning将返回false
	 * @param {boolean} [params.userInterface=true] - 是否显示UI（呼出底部DRC窗口）
	 * @returns {Promise<Object>} - 执行结果
	 */
	async checkDrc(params = {}) {
		try {
			const { strict = false, userInterface = true } = params;

			// 使用SCH_Drc类检查DRC规则
			const result = await eda.sch_Drc.check(strict, userInterface);
			return this.formatSuccess(result, result ? 'DRC检查通过' : 'DRC检查未通过');
		} catch (error) {
			return this.formatError(error, 'DRC检查失败');
		}
	}

	/**
	 * 新增鼠标事件监听
	 * @param {Object} params - 参数对象
	 * @param {string} params.id - 事件ID，用以防止重复注册事件
	 * @param {string} params.eventType - 事件类型，可选值：'all'|'selected'|'clearSelected'
	 * @param {Function} params.callFn - 事件触发时的回调函数
	 * @param {boolean} [params.onlyOnce=false] - 是否仅监听一次
	 * @returns {Promise<Object>} - 执行结果
	 */
	async addMouseEventListener(params) {
		try {
			if (!params.id || !params.eventType || !params.callFn) {
				return this.formatError('缺少必要参数', '请提供事件ID、事件类型和回调函数');
			}

			// 使用SCH_Event类新增鼠标事件监听
			eda.sch_Event.addMouseEventListener(params.id, params.eventType, params.callFn, params.onlyOnce || false);
			return this.formatSuccess(true, '成功添加鼠标事件监听');
		} catch (error) {
			return this.formatError(error, '添加鼠标事件监听失败');
		}
	}

	/**
	 * 移除事件监听
	 * @param {Object} params - 参数对象
	 * @param {string} params.id - 事件ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async removeEventListener(params) {
		try {
			if (!params.id) {
				return this.formatError('缺少必要参数', '请提供事件ID');
			}

			// 使用SCH_Event类移除事件监听
			const result = eda.sch_Event.removeEventListener(params.id);
			return this.formatSuccess(result, result ? '成功移除事件监听' : '移除事件监听失败');
		} catch (error) {
			return this.formatError(error, '移除事件监听失败');
		}
	}

	/**
	 * 查询事件监听是否存在
	 * @param {Object} params - 参数对象
	 * @param {string} params.id - 事件ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async isEventListenerAlreadyExist(params) {
		try {
			if (!params.id) {
				return this.formatError('缺少必要参数', '请提供事件ID');
			}

			// 使用SCH_Event类查询事件监听是否存在
			const result = eda.sch_Event.isEventListenerAlreadyExist(params.id);
			return this.formatSuccess(result, result ? '事件监听已存在' : '事件监听不存在');
		} catch (error) {
			return this.formatError(error, '查询事件监听失败');
		}
	}

	/**
	 * 获取BOM文件
	 * @param {Object} params - 参数对象
	 * @param {string} [params.fileName] - 文件名
	 * @param {string} [params.fileType='xlsx'] - 文件类型，可选值：'xlsx'|'csv'
	 * @param {string} [params.template] - 模板名称
	 * @param {Array<Object>} [params.filterOptions] - 过滤规则
	 * @param {Array<string>} [params.statistics] - 统计项
	 * @param {Array<string>} [params.property] - 属性项
	 * @param {Array<Object>} [params.columns] - 列的属性及排序
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getBomFile(params = {}) {
		try {
			// 使用SCH_ManufactureData类获取BOM文件
			const file = await eda.sch_ManufactureData.getBomFile(
				params.fileName,
				params.fileType,
				params.template,
				params.filterOptions,
				params.statistics,
				params.property,
				params.columns,
			);

			return this.formatSuccess(file, file ? '成功获取BOM文件' : '获取BOM文件失败');
		} catch (error) {
			return this.formatError(error, '获取BOM文件失败');
		}
	}

	/**
	 * 获取网表文件
	 * @param {Object} params - 参数对象
	 * @param {string} [params.fileName] - 文件名
	 * @param {string} [params.netlistType] - 网表类型
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getNetlistFile(params = {}) {
		try {
			// 使用SCH_ManufactureData类获取网表文件
			const file = await eda.sch_ManufactureData.getNetlistFile(params.fileName, params.netlistType);

			return this.formatSuccess(file, file ? '成功获取网表文件' : '获取网表文件失败');
		} catch (error) {
			return this.formatError(error, '获取网表文件失败');
		}
	}

	/**
	 * 元件下单
	 * @param {Object} params - 参数对象
	 * @param {boolean} [params.interactive=true] - 是否启用交互式检查
	 * @param {boolean} [params.ignoreWarning=false] - 在非交互式检查时忽略警告
	 * @returns {Promise<Object>} - 执行结果
	 */
	async placeComponentsOrder(params = {}) {
		try {
			const { interactive = true, ignoreWarning = false } = params;

			// 使用SCH_ManufactureData类进行元件下单
			const result = await eda.sch_ManufactureData.placeComponentsOrder(interactive, ignoreWarning);
			return this.formatSuccess(result, result ? '元件下单检查通过' : '元件下单检查未通过');
		} catch (error) {
			return this.formatError(error, '元件下单失败');
		}
	}

	/**
	 * SMT元件下单
	 * @param {Object} params - 参数对象
	 * @param {boolean} [params.interactive=true] - 是否启用交互式检查
	 * @param {boolean} [params.ignoreWarning=false] - 在非交互式检查时忽略警告
	 * @returns {Promise<Object>} - 执行结果
	 */
	async placeSmtComponentsOrder(params = {}) {
		try {
			const { interactive = true, ignoreWarning = false } = params;

			// 使用SCH_ManufactureData类进行SMT元件下单
			const result = await eda.sch_ManufactureData.placeSmtComponentsOrder(interactive, ignoreWarning);
			return this.formatSuccess(result, result ? 'SMT元件下单检查通过' : 'SMT元件下单检查未通过');
		} catch (error) {
			return this.formatError(error, 'SMT元件下单失败');
		}
	}

	/**
	 * 获取网表
	 * @param {Object} params - 参数对象
	 * @param {string} [params.type] - 网表格式
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getNetlist(params = {}) {
		try {
			// 使用SCH_Netlist类获取网表
			const netlist = await eda.sch_Netlist.getNetlist(params.type);
			return this.formatSuccess(netlist, netlist ? '成功获取网表' : '获取网表失败');
		} catch (error) {
			return this.formatError(error, '获取网表失败');
		}
	}

	/**
	 * 更新网表
	 * @param {Object} params - 参数对象
	 * @param {string} params.type - 网表格式
	 * @param {string} params.netlist - 网表数据
	 * @returns {Promise<Object>} - 执行结果
	 */
	async setNetlist(params) {
		try {
			if (!params.netlist) {
				return this.formatError('缺少必要参数', '请提供网表数据');
			}

			// 使用SCH_Netlist类更新网表
			await eda.sch_Netlist.setNetlist(params.type, params.netlist);
			return this.formatSuccess(true, '成功更新网表');
		} catch (error) {
			return this.formatError(error, '更新网表失败');
		}
	}

	/**
	 * 获取指定ID的图元类型
	 * @param {Object} params - 参数对象
	 * @param {string} params.id - 图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getPrimitiveTypeByPrimitiveId(params) {
		try {
			if (!params.id) {
				return this.formatError('缺少必要参数', '请提供图元ID');
			}

			// 使用SCH_Primitive类获取图元类型
			const primitiveType = await eda.sch_Primitive.getPrimitiveTypeByPrimitiveId(params.id);
			return this.formatSuccess(primitiveType, primitiveType ? '成功获取图元类型' : '获取图元类型失败');
		} catch (error) {
			return this.formatError(error, '获取图元类型失败');
		}
	}

	/**
	 * 获取指定ID的图元属性
	 * @param {Object} params - 参数对象
	 * @param {string} params.id - 图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getPrimitiveByPrimitiveId(params) {
		try {
			if (!params.id) {
				return this.formatError('缺少必要参数', '请提供图元ID');
			}

			// 使用SCH_Primitive类获取图元属性
			const primitive = await eda.sch_Primitive.getPrimitiveByPrimitiveId(params.id);
			return this.formatSuccess(primitive, primitive ? '成功获取图元属性' : '获取图元属性失败');
		} catch (error) {
			return this.formatError(error, '获取图元属性失败');
		}
	}

	/**
	 * 获取图元的边界框
	 * @param {Object} params - 参数对象
	 * @param {Array<string|Object>} params.primitiveIds - 图元ID数组或图元对象数组
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getPrimitivesBBox(params) {
		try {
			if (!params.primitiveIds || !Array.isArray(params.primitiveIds)) {
				return this.formatError('缺少必要参数', '请提供图元ID数组');
			}

			// 使用SCH_Primitive类获取图元边界框
			const bbox = await eda.sch_Primitive.getPrimitivesBBox(params.primitiveIds);
			return this.formatSuccess(bbox, bbox ? '成功获取图元边界框' : '获取图元边界框失败');
		} catch (error) {
			return this.formatError(error, '获取图元边界框失败');
		}
	}

	/**
	 * 创建圆弧图元
	 * @param {Object} params - 参数对象
	 * @param {number} params.startX - 起始点X
	 * @param {number} params.startY - 起始点Y
	 * @param {number} params.referenceX - 参考点X
	 * @param {number} params.referenceY - 参考点Y
	 * @param {number} params.endX - 终止点X
	 * @param {number} params.endY - 终止点Y
	 * @param {string} [params.color] - 颜色
	 * @param {string} [params.fillColor] - 填充颜色
	 * @param {number} [params.lineWidth] - 线宽
	 * @param {string} [params.lineType] - 线型
	 * @returns {Promise<Object>} - 执行结果
	 */
	async createArc(params) {
		try {
			const requiredParams = ['startX', 'startY', 'referenceX', 'referenceY', 'endX', 'endY'];
			for (const param of requiredParams) {
				if (params[param] === undefined || params[param] === null) {
					return this.formatError('缺少必要参数', `请提供${param}`);
				}
			}

			// 使用SCH_PrimitiveArc类创建圆弧
			const arc = await eda.sch_PrimitiveArc.create(
				params.startX,
				params.startY,
				params.referenceX,
				params.referenceY,
				params.endX,
				params.endY,
				params.color || null,
				params.fillColor || null,
				params.lineWidth || null,
				params.lineType || null,
			);
			return this.formatSuccess(arc, arc ? '成功创建圆弧图元' : '创建圆弧图元失败');
		} catch (error) {
			return this.formatError(error, '创建圆弧图元失败');
		}
	}

	/**
	 * 删除圆弧图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>|Object|Array<Object>} params.primitiveIds - 圆弧图元ID或图元对象
	 * @returns {Promise<Object>} - 执行结果
	 */
	async deleteArc(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供圆弧图元ID或对象');
			}

			// 使用SCH_PrimitiveArc类删除圆弧
			const result = await eda.sch_PrimitiveArc.delete(params.primitiveIds);
			return this.formatSuccess(result, result ? '成功删除圆弧图元' : '删除圆弧图元失败');
		} catch (error) {
			return this.formatError(error, '删除圆弧图元失败');
		}
	}

	/**
	 * 修改圆弧图元
	 * @param {Object} params - 参数对象
	 * @param {string|Object} params.primitiveId - 图元ID或图元对象
	 * @param {Object} params.property - 修改参数
	 * @returns {Promise<Object>} - 执行结果
	 */
	async modifyArc(params) {
		try {
			if (!params.primitiveId || !params.property) {
				return this.formatError('缺少必要参数', '请提供图元ID和修改参数');
			}

			// 使用SCH_PrimitiveArc类修改圆弧
			const arc = await eda.sch_PrimitiveArc.modify(params.primitiveId, params.property);
			return this.formatSuccess(arc, arc ? '成功修改圆弧图元' : '修改圆弧图元失败');
		} catch (error) {
			return this.formatError(error, '修改圆弧图元失败');
		}
	}

	/**
	 * 获取圆弧图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>} params.primitiveIds - 圆弧图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getArc(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供圆弧图元ID');
			}

			// 使用SCH_PrimitiveArc类获取圆弧
			const arc = await eda.sch_PrimitiveArc.get(params.primitiveIds);
			return this.formatSuccess(arc, arc ? '成功获取圆弧图元' : '获取圆弧图元失败');
		} catch (error) {
			return this.formatError(error, '获取圆弧图元失败');
		}
	}

	/**
	 * 获取所有圆弧图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllArcPrimitiveId() {
		try {
			// 使用SCH_PrimitiveArc类获取所有圆弧图元ID
			const primitiveIds = await eda.sch_PrimitiveArc.getAllPrimitiveId();
			return this.formatSuccess(primitiveIds, `获取到 ${primitiveIds ? primitiveIds.length : 0} 个圆弧图元ID`);
		} catch (error) {
			return this.formatError(error, '获取圆弧图元ID失败');
		}
	}

	/**
	 * 获取所有圆弧图元
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllArc() {
		try {
			// 使用SCH_PrimitiveArc类获取所有圆弧图元
			const arcs = await eda.sch_PrimitiveArc.getAll();
			return this.formatSuccess(arcs, `获取到 ${arcs ? arcs.length : 0} 个圆弧图元`);
		} catch (error) {
			return this.formatError(error, '获取圆弧图元失败');
		}
	}

	/**
	 * 创建总线图元
	 * @param {Object} params - 参数对象
	 * @param {string} params.busName - 总线名称
	 * @param {Array<number>|Array<Array<number>>} params.line - 多段线坐标组
	 * @param {string} [params.color] - 总线颜色
	 * @param {number} [params.lineWidth] - 线宽
	 * @param {string} [params.lineType] - 线型
	 * @returns {Promise<Object>} - 执行结果
	 */
	async createBus(params) {
		try {
			if (!params.busName || !params.line) {
				return this.formatError('缺少必要参数', '请提供总线名称和线坐标');
			}

			// 使用SCH_PrimitiveBus类创建总线
			const bus = await eda.sch_PrimitiveBus.create(
				params.busName,
				params.line,
				params.color || null,
				params.lineWidth || null,
				params.lineType || null,
			);
			return this.formatSuccess(bus, bus ? '成功创建总线图元' : '创建总线图元失败');
		} catch (error) {
			return this.formatError(error, '创建总线图元失败');
		}
	}

	/**
	 * 删除总线图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>|Object|Array<Object>} params.primitiveIds - 总线图元ID或图元对象
	 * @returns {Promise<Object>} - 执行结果
	 */
	async deleteBus(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供总线图元ID或对象');
			}

			// 使用SCH_PrimitiveBus类删除总线
			const result = await eda.sch_PrimitiveBus.delete(params.primitiveIds);
			return this.formatSuccess(result, result ? '成功删除总线图元' : '删除总线图元失败');
		} catch (error) {
			return this.formatError(error, '删除总线图元失败');
		}
	}

	/**
	 * 修改总线图元
	 * @param {Object} params - 参数对象
	 * @param {string|Object} params.primitiveId - 图元ID或图元对象
	 * @param {Object} params.property - 修改参数
	 * @returns {Promise<Object>} - 执行结果
	 */
	async modifyBus(params) {
		try {
			if (!params.primitiveId || !params.property) {
				return this.formatError('缺少必要参数', '请提供图元ID和修改参数');
			}

			// 使用SCH_PrimitiveBus类修改总线
			const bus = await eda.sch_PrimitiveBus.modify(params.primitiveId, params.property);
			return this.formatSuccess(bus, bus ? '成功修改总线图元' : '修改总线图元失败');
		} catch (error) {
			return this.formatError(error, '修改总线图元失败');
		}
	}

	/**
	 * 获取总线图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>} params.primitiveIds - 总线图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getBus(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供总线图元ID');
			}

			// 使用SCH_PrimitiveBus类获取总线
			const bus = await eda.sch_PrimitiveBus.get(params.primitiveIds);
			return this.formatSuccess(bus, bus ? '成功获取总线图元' : '获取总线图元失败');
		} catch (error) {
			return this.formatError(error, '获取总线图元失败');
		}
	}

	/**
	 * 获取所有总线图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllBusPrimitiveId() {
		try {
			// 使用SCH_PrimitiveBus类获取所有总线图元ID
			const primitiveIds = await eda.sch_PrimitiveBus.getAllPrimitiveId();
			return this.formatSuccess(primitiveIds, `获取到 ${primitiveIds ? primitiveIds.length : 0} 个总线图元ID`);
		} catch (error) {
			return this.formatError(error, '获取总线图元ID失败');
		}
	}

	/**
	 * 获取所有总线图元
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllBus() {
		try {
			// 使用SCH_PrimitiveBus类获取所有总线图元
			const buses = await eda.sch_PrimitiveBus.getAll();
			return this.formatSuccess(buses, `获取到 ${buses ? buses.length : 0} 个总线图元`);
		} catch (error) {
			return this.formatError(error, '获取总线图元失败');
		}
	}

	/**
	 * 创建圆图元
	 * @param {Object} params - 参数对象
	 * @param {number} params.centerX - 圆心X坐标
	 * @param {number} params.centerY - 圆心Y坐标
	 * @param {number} params.radius - 半径
	 * @param {string} [params.color] - 颜色
	 * @param {string} [params.fillColor] - 填充颜色
	 * @param {number} [params.lineWidth] - 线宽
	 * @param {string} [params.lineType] - 线型
	 * @param {string} [params.fillStyle] - 填充样式
	 * @returns {Promise<Object>} - 执行结果
	 */
	async createCircle(params) {
		try {
			const requiredParams = ['centerX', 'centerY', 'radius'];
			for (const param of requiredParams) {
				if (params[param] === undefined || params[param] === null) {
					return this.formatError('缺少必要参数', `请提供${param}`);
				}
			}

			// 使用SCH_PrimitiveCircle类创建圆
			const circle = await eda.sch_PrimitiveCircle.create(
				params.centerX,
				params.centerY,
				params.radius,
				params.color || null,
				params.fillColor || null,
				params.lineWidth || null,
				params.lineType || null,
				params.fillStyle || null,
			);
			return this.formatSuccess(circle, circle ? '成功创建圆图元' : '创建圆图元失败');
		} catch (error) {
			return this.formatError(error, '创建圆图元失败');
		}
	}

	/**
	 * 删除圆图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>|Object|Array<Object>} params.primitiveIds - 圆图元ID或图元对象
	 * @returns {Promise<Object>} - 执行结果
	 */
	async deleteCircle(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供圆图元ID或对象');
			}

			// 使用SCH_PrimitiveCircle类删除圆
			const result = await eda.sch_PrimitiveCircle.delete(params.primitiveIds);
			return this.formatSuccess(result, result ? '成功删除圆图元' : '删除圆图元失败');
		} catch (error) {
			return this.formatError(error, '删除圆图元失败');
		}
	}

	/**
	 * 修改圆图元
	 * @param {Object} params - 参数对象
	 * @param {string|Object} params.primitiveId - 图元ID或图元对象
	 * @param {Object} params.property - 修改参数
	 * @returns {Promise<Object>} - 执行结果
	 */
	async modifyCircle(params) {
		try {
			if (!params.primitiveId || !params.property) {
				return this.formatError('缺少必要参数', '请提供图元ID和修改参数');
			}

			// 使用SCH_PrimitiveCircle类修改圆
			const circle = await eda.sch_PrimitiveCircle.modify(params.primitiveId, params.property);
			return this.formatSuccess(circle, circle ? '成功修改圆图元' : '修改圆图元失败');
		} catch (error) {
			return this.formatError(error, '修改圆图元失败');
		}
	}

	/**
	 * 获取圆图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>} params.primitiveIds - 圆图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getCircle(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供圆图元ID');
			}

			// 使用SCH_PrimitiveCircle类获取圆
			const circle = await eda.sch_PrimitiveCircle.get(params.primitiveIds);
			return this.formatSuccess(circle, circle ? '成功获取圆图元' : '获取圆图元失败');
		} catch (error) {
			return this.formatError(error, '获取圆图元失败');
		}
	}

	/**
	 * 获取所有圆图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllCirclePrimitiveId() {
		try {
			// 使用SCH_PrimitiveCircle类获取所有圆图元ID
			const primitiveIds = await eda.sch_PrimitiveCircle.getAllPrimitiveId();
			return this.formatSuccess(primitiveIds, `获取到 ${primitiveIds ? primitiveIds.length : 0} 个圆图元ID`);
		} catch (error) {
			return this.formatError(error, '获取圆图元ID失败');
		}
	}

	/**
	 * 获取所有圆图元
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllCircle() {
		try {
			// 使用SCH_PrimitiveCircle类获取所有圆图元
			const circles = await eda.sch_PrimitiveCircle.getAll();
			return this.formatSuccess(circles, `获取到 ${circles ? circles.length : 0} 个圆图元`);
		} catch (error) {
			return this.formatError(error, '获取圆图元失败');
		}
	}

	/**
	 * 设置Power网络标识关联的器件UUID
	 * @param {Object} params - 参数对象
	 * @param {Object} params.component - 关联库器件
	 * @returns {Promise<Object>} - 执行结果
	 */
	async setNetFlagComponentUuid_Power(params) {
		try {
			if (!params.component) {
				return this.formatError('缺少必要参数', '请提供关联库器件');
			}

			// 使用SCH_PrimitiveComponent类设置Power网络标识器件UUID
			const result = await eda.sch_PrimitiveComponent.setNetFlagComponentUuid_Power(params.component);
			return this.formatSuccess(result, result ? '成功设置Power网络标识器件UUID' : '设置Power网络标识器件UUID失败');
		} catch (error) {
			return this.formatError(error, '设置Power网络标识器件UUID失败');
		}
	}

	/**
	 * 设置Ground网络标识关联的器件UUID
	 * @param {Object} params - 参数对象
	 * @param {Object} params.component - 关联库器件
	 * @returns {Promise<Object>} - 执行结果
	 */
	async setNetFlagComponentUuid_Ground(params) {
		try {
			if (!params.component) {
				return this.formatError('缺少必要参数', '请提供关联库器件');
			}

			// 使用SCH_PrimitiveComponent类设置Ground网络标识器件UUID
			const result = await eda.sch_PrimitiveComponent.setNetFlagComponentUuid_Ground(params.component);
			return this.formatSuccess(result, result ? '成功设置Ground网络标识器件UUID' : '设置Ground网络标识器件UUID失败');
		} catch (error) {
			return this.formatError(error, '设置Ground网络标识器件UUID失败');
		}
	}

	/**
	 * 设置AnalogGround网络标识关联的器件UUID
	 * @param {Object} params - 参数对象
	 * @param {Object} params.component - 关联库器件
	 * @returns {Promise<Object>} - 执行结果
	 */
	async setNetFlagComponentUuid_AnalogGround(params) {
		try {
			if (!params.component) {
				return this.formatError('缺少必要参数', '请提供关联库器件');
			}

			// 使用SCH_PrimitiveComponent类设置AnalogGround网络标识器件UUID
			const result = await eda.sch_PrimitiveComponent.setNetFlagComponentUuid_AnalogGround(params.component);
			return this.formatSuccess(result, result ? '成功设置AnalogGround网络标识器件UUID' : '设置AnalogGround网络标识器件UUID失败');
		} catch (error) {
			return this.formatError(error, '设置AnalogGround网络标识器件UUID失败');
		}
	}

	/**
	 * 设置ProtectGround网络标识关联的器件UUID
	 * @param {Object} params - 参数对象
	 * @param {Object} params.component - 关联库器件
	 * @returns {Promise<Object>} - 执行结果
	 */
	async setNetFlagComponentUuid_ProtectGround(params) {
		try {
			if (!params.component) {
				return this.formatError('缺少必要参数', '请提供关联库器件');
			}

			// 使用SCH_PrimitiveComponent类设置ProtectGround网络标识器件UUID
			const result = await eda.sch_PrimitiveComponent.setNetFlagComponentUuid_ProtectGround(params.component);
			return this.formatSuccess(result, result ? '成功设置ProtectGround网络标识器件UUID' : '设置ProtectGround网络标识器件UUID失败');
		} catch (error) {
			return this.formatError(error, '设置ProtectGround网络标识器件UUID失败');
		}
	}

	/**
	 * 设置IN网络端口关联的器件UUID
	 * @param {Object} params - 参数对象
	 * @param {Object} params.component - 关联库器件
	 * @returns {Promise<Object>} - 执行结果
	 */
	async setNetPortComponentUuid_IN(params) {
		try {
			if (!params.component) {
				return this.formatError('缺少必要参数', '请提供关联库器件');
			}

			// 使用SCH_PrimitiveComponent类设置IN网络端口器件UUID
			const result = await eda.sch_PrimitiveComponent.setNetPortComponentUuid_IN(params.component);
			return this.formatSuccess(result, result ? '成功设置IN网络端口器件UUID' : '设置IN网络端口器件UUID失败');
		} catch (error) {
			return this.formatError(error, '设置IN网络端口器件UUID失败');
		}
	}

	/**
	 * 设置OUT网络端口关联的器件UUID
	 * @param {Object} params - 参数对象
	 * @param {Object} params.component - 关联库器件
	 * @returns {Promise<Object>} - 执行结果
	 */
	async setNetPortComponentUuid_OUT(params) {
		try {
			if (!params.component) {
				return this.formatError('缺少必要参数', '请提供关联库器件');
			}

			// 使用SCH_PrimitiveComponent类设置OUT网络端口器件UUID
			const result = await eda.sch_PrimitiveComponent.setNetPortComponentUuid_OUT(params.component);
			return this.formatSuccess(result, result ? '成功设置OUT网络端口器件UUID' : '设置OUT网络端口器件UUID失败');
		} catch (error) {
			return this.formatError(error, '设置OUT网络端口器件UUID失败');
		}
	}

	/**
	 * 设置BI网络端口关联的器件UUID
	 * @param {Object} params - 参数对象
	 * @param {Object} params.component - 关联库器件
	 * @returns {Promise<Object>} - 执行结果
	 */
	async setNetPortComponentUuid_BI(params) {
		try {
			if (!params.component) {
				return this.formatError('缺少必要参数', '请提供关联库器件');
			}

			// 使用SCH_PrimitiveComponent类设置BI网络端口器件UUID
			const result = await eda.sch_PrimitiveComponent.setNetPortComponentUuid_BI(params.component);
			return this.formatSuccess(result, result ? '成功设置BI网络端口器件UUID' : '设置BI网络端口器件UUID失败');
		} catch (error) {
			return this.formatError(error, '设置BI网络端口器件UUID失败');
		}
	}

	/**
	 * 创建器件
	 * @param {Object} params - 参数对象
	 * @param {Object} params.component - 关联库器件
	 * @param {number} params.x - 坐标X
	 * @param {number} params.y - 坐标Y
	 * @param {string} [params.subPartName] - 子图块名称
	 * @param {number} [params.rotation] - 旋转角度
	 * @param {boolean} [params.mirror] - 是否镜像
	 * @param {boolean} [params.addIntoBom] - 是否加入BOM
	 * @param {boolean} [params.addIntoPcb] - 是否转到PCB
	 * @returns {Promise<Object>} - 执行结果
	 */
	async createComponent(params) {
		try {
			const requiredParams = ['component', 'x', 'y'];
			for (const param of requiredParams) {
				if (params[param] === undefined || params[param] === null) {
					return this.formatError('缺少必要参数', `请提供${param}`);
				}
			}

			// 使用SCH_PrimitiveComponent类创建器件
			const component = await eda.sch_PrimitiveComponent.create(
				params.component,
				params.x,
				params.y,
				params.subPartName,
				params.rotation,
				params.mirror,
				params.addIntoBom,
				params.addIntoPcb,
			);
			return this.formatSuccess(component, component ? '成功创建器件' : '创建器件失败');
		} catch (error) {
			return this.formatError(error, '创建器件失败');
		}
	}

	/**
	 * 创建网络标识
	 * @param {Object} params - 参数对象
	 * @param {string} params.identification - 标识类型
	 * @param {string} params.net - 网络名称
	 * @param {number} params.x - 坐标X
	 * @param {number} params.y - 坐标Y
	 * @param {number} [params.rotation] - 旋转角度
	 * @param {boolean} [params.mirror] - 是否镜像
	 * @returns {Promise<Object>} - 执行结果
	 */
	async createNetFlag(params) {
		try {
			const requiredParams = ['identification', 'net', 'x', 'y'];
			for (const param of requiredParams) {
				if (params[param] === undefined || params[param] === null) {
					return this.formatError('缺少必要参数', `请提供${param}`);
				}
			}

			// 验证标识类型
			const validIdentifications = ['Power', 'Ground', 'AnalogGround', 'ProtectGround'];
			if (!validIdentifications.includes(params.identification)) {
				return this.formatError('参数错误', '标识类型必须是Power、Ground、AnalogGround或ProtectGround之一');
			}

			// 使用SCH_PrimitiveComponent类创建网络标识
			const netFlag = await eda.sch_PrimitiveComponent.createNetFlag(
				params.identification,
				params.net,
				params.x,
				params.y,
				params.rotation,
				params.mirror,
			);
			return this.formatSuccess(netFlag, netFlag ? '成功创建网络标识' : '创建网络标识失败');
		} catch (error) {
			return this.formatError(error, '创建网络标识失败');
		}
	}

	/**
	 * 创建网络端口
	 * @param {Object} params - 参数对象
	 * @param {string} params.direction - 端口方向
	 * @param {string} params.net - 网络名称
	 * @param {number} params.x - 坐标X
	 * @param {number} params.y - 坐标Y
	 * @param {number} [params.rotation] - 旋转角度
	 * @param {boolean} [params.mirror] - 是否镜像
	 * @returns {Promise<Object>} - 执行结果
	 */
	async createNetPort(params) {
		try {
			const requiredParams = ['direction', 'net', 'x', 'y'];
			for (const param of requiredParams) {
				if (params[param] === undefined || params[param] === null) {
					return this.formatError('缺少必要参数', `请提供${param}`);
				}
			}

			// 验证端口方向
			const validDirections = ['IN', 'OUT', 'BI'];
			if (!validDirections.includes(params.direction)) {
				return this.formatError('参数错误', '端口方向必须是IN、OUT或BI之一');
			}

			// 使用SCH_PrimitiveComponent类创建网络端口
			const netPort = await eda.sch_PrimitiveComponent.createNetPort(
				params.direction,
				params.net,
				params.x,
				params.y,
				params.rotation,
				params.mirror,
			);
			return this.formatSuccess(netPort, netPort ? '成功创建网络端口' : '创建网络端口失败');
		} catch (error) {
			return this.formatError(error, '创建网络端口失败');
		}
	}

	/**
	 * 创建短接标识
	 * @param {Object} params - 参数对象
	 * @param {number} params.x - 坐标X
	 * @param {number} params.y - 坐标Y
	 * @param {number} [params.rotation] - 旋转角度
	 * @param {boolean} [params.mirror] - 是否镜像
	 * @returns {Promise<Object>} - 执行结果
	 */
	async createShortCircuitFlag(params) {
		try {
			const requiredParams = ['x', 'y'];
			for (const param of requiredParams) {
				if (params[param] === undefined || params[param] === null) {
					return this.formatError('缺少必要参数', `请提供${param}`);
				}
			}

			// 使用SCH_PrimitiveComponent类创建短接标识
			const shortCircuitFlag = await eda.sch_PrimitiveComponent.createShortCircuitFlag(params.x, params.y, params.rotation, params.mirror);
			return this.formatSuccess(shortCircuitFlag, shortCircuitFlag ? '成功创建短接标识' : '创建短接标识失败');
		} catch (error) {
			return this.formatError(error, '创建短接标识失败');
		}
	}

	/**
	 * 删除器件
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>|Object|Array<Object>} params.primitiveIds - 器件图元ID或图元对象
	 * @returns {Promise<Object>} - 执行结果
	 */
	async deleteComponent(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供器件图元ID或对象');
			}

			// 使用SCH_PrimitiveComponent类删除器件
			const result = await eda.sch_PrimitiveComponent.delete(params.primitiveIds);
			return this.formatSuccess(result, result ? '成功删除器件' : '删除器件失败');
		} catch (error) {
			return this.formatError(error, '删除器件失败');
		}
	}

	/**
	 * 创建矩形图元
	 * @param {Object} params - 参数对象
	 * @param {number} params.topLeftX - 左上点X
	 * @param {number} params.topLeftY - 左上点Y
	 * @param {number} params.width - 宽
	 * @param {number} params.height - 高
	 * @param {number} [params.cornerRadius] - 圆角半径
	 * @param {number} [params.rotation] - 旋转角度，绕左上点旋转，可选 0、90、180、270
	 * @param {string} [params.color] - 颜色，null表示默认
	 * @param {string} [params.fillColor] - 填充颜色，none表示无填充，null表示默认
	 * @param {number} [params.lineWidth] - 线宽，范围1-10，null表示默认
	 * @param {string} [params.lineType] - 线型，null表示默认
	 * @param {string} [params.fillStyle] - 填充样式，null表示默认
	 * @returns {Promise<Object>} - 执行结果
	 */
	async createRectangle(params) {
		try {
			const requiredParams = ['topLeftX', 'topLeftY', 'width', 'height'];
			for (const param of requiredParams) {
				if (params[param] === undefined || params[param] === null) {
					return this.formatError('缺少必要参数', `请提供${param}`);
				}
			}

			// 验证旋转角度
			if (params.rotation !== undefined && ![0, 90, 180, 270].includes(params.rotation)) {
				return this.formatError('参数错误', '旋转角度必须是0、90、180或270之一');
			}

			// 验证线宽
			if (params.lineWidth !== undefined && params.lineWidth !== null && (params.lineWidth < 1 || params.lineWidth > 10)) {
				return this.formatError('参数错误', '线宽必须在1-10范围内');
			}

			// 使用SCH_PrimitiveRectangle类创建矩形
			const rectangle = await eda.sch_PrimitiveRectangle.create(
				params.topLeftX,
				params.topLeftY,
				params.width,
				params.height,
				params.cornerRadius,
				params.rotation,
				params.color,
				params.fillColor,
				params.lineWidth,
				params.lineType,
				params.fillStyle,
			);
			return this.formatSuccess(rectangle, rectangle ? '成功创建矩形图元' : '创建矩形图元失败');
		} catch (error) {
			return this.formatError(error, '创建矩形图元失败');
		}
	}

	/**
	 * 删除矩形图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>|Object|Array<Object>} params.primitiveIds - 矩形图元ID或图元对象
	 * @returns {Promise<Object>} - 执行结果
	 */
	async deleteRectangle(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供矩形图元ID或对象');
			}

			// 使用SCH_PrimitiveRectangle类删除矩形
			const result = await eda.sch_PrimitiveRectangle.delete(params.primitiveIds);
			return this.formatSuccess(result, result ? '成功删除矩形图元' : '删除矩形图元失败');
		} catch (error) {
			return this.formatError(error, '删除矩形图元失败');
		}
	}

	/**
	 * 修改矩形图元
	 * @param {Object} params - 参数对象
	 * @param {string|Object} params.primitiveId - 矩形图元ID或图元对象
	 * @param {Object} params.property - 修改参数
	 * @param {number} [params.property.topLeftX] - 左上点X
	 * @param {number} [params.property.topLeftY] - 左上点Y
	 * @param {number} [params.property.width] - 宽
	 * @param {number} [params.property.height] - 高
	 * @param {number} [params.property.cornerRadius] - 圆角半径
	 * @param {number} [params.property.rotation] - 旋转角度
	 * @param {string} [params.property.color] - 颜色
	 * @param {string} [params.property.fillColor] - 填充颜色
	 * @param {number} [params.property.lineWidth] - 线宽
	 * @param {string} [params.property.lineType] - 线型
	 * @param {string} [params.property.fillStyle] - 填充样式
	 * @returns {Promise<Object>} - 执行结果
	 */
	async modifyRectangle(params) {
		try {
			if (!params.primitiveId) {
				return this.formatError('缺少必要参数', '请提供矩形图元ID或对象');
			}

			if (!params.property || Object.keys(params.property).length === 0) {
				return this.formatError('缺少必要参数', '请提供至少一个要修改的属性');
			}

			// 验证旋转角度
			if (params.property.rotation !== undefined && ![0, 90, 180, 270].includes(params.property.rotation)) {
				return this.formatError('参数错误', '旋转角度必须是0、90、180或270之一');
			}

			// 验证线宽
			if (
				params.property.lineWidth !== undefined &&
				params.property.lineWidth !== null &&
				(params.property.lineWidth < 1 || params.property.lineWidth > 10)
			) {
				return this.formatError('参数错误', '线宽必须在1-10范围内');
			}

			// 使用SCH_PrimitiveRectangle类修改矩形
			const rectangle = await eda.sch_PrimitiveRectangle.modify(params.primitiveId, params.property);
			return this.formatSuccess(rectangle, rectangle ? '成功修改矩形图元' : '修改矩形图元失败');
		} catch (error) {
			return this.formatError(error, '修改矩形图元失败');
		}
	}

	/**
	 * 获取矩形图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>} params.primitiveIds - 矩形图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getRectangle(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供矩形图元ID');
			}

			// 使用SCH_PrimitiveRectangle类获取矩形
			const rectangle = await eda.sch_PrimitiveRectangle.get(params.primitiveIds);
			if (Array.isArray(params.primitiveIds)) {
				return this.formatSuccess(rectangle, `获取到 ${rectangle ? rectangle.length : 0} 个矩形图元`);
			} else {
				return this.formatSuccess(rectangle, rectangle ? '成功获取矩形图元' : '获取矩形图元失败');
			}
		} catch (error) {
			return this.formatError(error, '获取矩形图元失败');
		}
	}

	/**
	 * 获取所有矩形图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllRectanglePrimitiveId() {
		try {
			// 使用SCH_PrimitiveRectangle类获取所有矩形图元ID
			const ids = await eda.sch_PrimitiveRectangle.getAllPrimitiveId();
			return this.formatSuccess(ids, `获取到 ${ids ? ids.length : 0} 个矩形图元ID`);
		} catch (error) {
			return this.formatError(error, '获取矩形图元ID失败');
		}
	}

	/**
	 * 获取所有矩形图元
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllRectangle() {
		try {
			// 使用SCH_PrimitiveRectangle类获取所有矩形图元
			const rectangles = await eda.sch_PrimitiveRectangle.getAll();
			return this.formatSuccess(rectangles, `获取到 ${rectangles ? rectangles.length : 0} 个矩形图元`);
		} catch (error) {
			return this.formatError(error, '获取矩形图元失败');
		}
	}

	/**
	 * 创建文本图元
	 * @param {Object} params - 参数对象
	 * @param {number} params.x - 坐标X
	 * @param {number} params.y - 坐标Y
	 * @param {string} params.content - 文本内容
	 * @param {string} [params.text] - 文本内容（与content参数二选一，优先使用content）
	 * @param {number} [params.rotation] - 旋转角度，可选 0、90、180、270
	 * @param {string} [params.textColor] - 文本颜色，null表示默认
	 * @param {string} [params.fontName] - 字体名称，null表示默认
	 * @param {number} [params.fontSize] - 字体大小，null表示默认
	 * @param {boolean} [params.bold] - 是否加粗
	 * @param {boolean} [params.italic] - 是否斜体
	 * @param {boolean} [params.underLine] - 是否加下划线
	 * @param {number} [params.alignMode] - 对齐模式，0左顶，1中顶，2右顶，3左中，4中中，5右中，6左底，7中底，8右底
	 * @returns {Promise<Object>} - 执行结果
	 */
	async createText(params) {
		try {
			// 兼容text和content参数
			if (params.text !== undefined && params.content === undefined) {
				params.content = params.text;
			}

			const requiredParams = ['x', 'y', 'content'];
			for (const param of requiredParams) {
				if (params[param] === undefined || params[param] === null) {
					return this.formatError('缺少必要参数', `请提供${param}`);
				}
			}

			// 验证旋转角度
			if (params.rotation !== undefined && ![0, 90, 180, 270].includes(params.rotation)) {
				return this.formatError('参数错误', '旋转角度必须是0、90、180或270之一');
			}

			// 验证对齐模式
			if (params.alignMode !== undefined && (params.alignMode < 0 || params.alignMode > 8)) {
				return this.formatError('参数错误', '对齐模式必须在0-8范围内');
			}

			// 使用SCH_PrimitiveText类创建文本
			const text = await eda.sch_PrimitiveText.create(
				params.x,
				params.y,
				params.content,
				params.rotation,
				params.textColor,
				params.fontName,
				params.fontSize,
				params.bold,
				params.italic,
				params.underLine,
				params.alignMode,
			);
			return this.formatSuccess(text, text ? '成功创建文本图元' : '创建文本图元失败');
		} catch (error) {
			return this.formatError(error, '创建文本图元失败');
		}
	}

	/**
	 * 删除文本图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>|Object|Array<Object>} params.primitiveIds - 文本图元ID或图元对象
	 * @returns {Promise<Object>} - 执行结果
	 */
	async deleteText(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供文本图元ID或对象');
			}

			// 使用SCH_PrimitiveText类删除文本
			const result = await eda.sch_PrimitiveText.delete(params.primitiveIds);
			return this.formatSuccess(result, result ? '成功删除文本图元' : '删除文本图元失败');
		} catch (error) {
			return this.formatError(error, '删除文本图元失败');
		}
	}

	/**
	 * 修改文本图元
	 * @param {Object} params - 参数对象
	 * @param {string|Object} params.primitiveId - 文本图元ID或图元对象
	 * @param {Object} params.property - 修改参数
	 * @param {number} [params.property.x] - 坐标X
	 * @param {number} [params.property.y] - 坐标Y
	 * @param {string} [params.property.content] - 文本内容
	 * @param {string} [params.property.text] - 文本内容（与content参数二选一，优先使用content）
	 * @param {number} [params.property.rotation] - 旋转角度
	 * @param {string} [params.property.textColor] - 文本颜色
	 * @param {string} [params.property.fontName] - 字体名称
	 * @param {number} [params.property.fontSize] - 字体大小
	 * @param {boolean} [params.property.bold] - 是否加粗
	 * @param {boolean} [params.property.italic] - 是否斜体
	 * @param {boolean} [params.property.underLine] - 是否加下划线
	 * @param {number} [params.property.alignMode] - 对齐模式
	 * @returns {Promise<Object>} - 执行结果
	 */
	async modifyText(params) {
		try {
			if (!params.primitiveId) {
				return this.formatError('缺少必要参数', '请提供文本图元ID或对象');
			}

			if (!params.property || Object.keys(params.property).length === 0) {
				return this.formatError('缺少必要参数', '请提供至少一个要修改的属性');
			}

			// 兼容text和content参数
			if (params.property.text !== undefined && params.property.content === undefined) {
				params.property.content = params.property.text;
			}

			// 验证旋转角度
			if (params.property.rotation !== undefined && ![0, 90, 180, 270].includes(params.property.rotation)) {
				return this.formatError('参数错误', '旋转角度必须是0、90、180或270之一');
			}

			// 验证对齐模式
			if (params.property.alignMode !== undefined && (params.property.alignMode < 0 || params.property.alignMode > 8)) {
				return this.formatError('参数错误', '对齐模式必须在0-8范围内');
			}

			// 使用SCH_PrimitiveText类修改文本
			const text = await eda.sch_PrimitiveText.modify(params.primitiveId, params.property);
			return this.formatSuccess(text, text ? '成功修改文本图元' : '修改文本图元失败');
		} catch (error) {
			return this.formatError(error, '修改文本图元失败');
		}
	}

	/**
	 * 获取文本图元
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>} params.primitiveIds - 文本图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getText(params) {
		try {
			if (!params.primitiveIds) {
				return this.formatError('缺少必要参数', '请提供文本图元ID');
			}

			// 使用SCH_PrimitiveText类获取文本
			const text = await eda.sch_PrimitiveText.get(params.primitiveIds);
			if (Array.isArray(params.primitiveIds)) {
				return this.formatSuccess(text, `获取到 ${text ? text.length : 0} 个文本图元`);
			} else {
				return this.formatSuccess(text, text ? '成功获取文本图元' : '获取文本图元失败');
			}
		} catch (error) {
			return this.formatError(error, '获取文本图元失败');
		}
	}

	/**
	 * 获取所有文本图元ID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllTextPrimitiveId() {
		try {
			// 使用SCH_PrimitiveText类获取所有文本图元ID
			const ids = await eda.sch_PrimitiveText.getAllPrimitiveId();
			return this.formatSuccess(ids, `获取到 ${ids ? ids.length : 0} 个文本图元ID`);
		} catch (error) {
			return this.formatError(error, '获取文本图元ID失败');
		}
	}

	/**
	 * 获取所有文本图元
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getAllText() {
		try {
			// 使用SCH_PrimitiveText类获取所有文本图元
			const texts = await eda.sch_PrimitiveText.getAll();
			return this.formatSuccess(texts, `获取到 ${texts ? texts.length : 0} 个文本图元`);
		} catch (error) {
			return this.formatError(error, '获取文本图元失败');
		}
	}
}

// 导出原理图适配器
window.SchematicAdapter = SchematicAdapter;
