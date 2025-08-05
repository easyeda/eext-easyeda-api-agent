/**
 * 文档适配器
 * 处理文档树相关API，如项目、文档管理等
 */
class DocumentAdapter extends BaseAdapter {
	constructor() {
		super();
		this.initTools();
	}

	initTools() {
		this.registerTool('getDocumentInfo', '获取当前文档信息', () => this.getDocumentInfo());

		this.registerTool('getProjectInfo', '获取工程属性', () => this.getProjectInfo());

		this.registerTool('getDocumentList', '获取项目中的文档列表', (params) => this.getDocumentList(params));

		this.registerTool('createDocument', '创建新文档', (params) => this.createDocument(params));
	}

	/**
	 * 获取当前文档信息
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getDocumentInfo() {
		try {
			// 使用DMT_SelectControl类获取当前文档信息
			const docInfo = await eda.dmt_SelectControl.getCurrentDocumentInfo();
			if (docInfo) {
				return this.formatSuccess(
					{
						uuid: docInfo.uuid,
						type: docInfo.documentType,
						parentProjectUuid: docInfo.parentProjectUuid,
					},
					'成功获取文档信息',
				);
			} else {
				return this.formatError('未能获取到文档信息', '可能没有打开的工程或文档');
			}
		} catch (error) {
			return this.formatError(error, '获取文档信息失败');
		}
	}

	/**
	 * 获取当前项目信息
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getProjectInfo() {
		try {
			// 使用DMT_Project类获取当前项目信息
			const projectInfo = await eda.dmt_Project.getCurrentProjectInfo();
			if (projectInfo) {
				return this.formatSuccess(
					{
						uuid: projectInfo.uuid,
						name: projectInfo.name,
						path: projectInfo.path,
					},
					'成功获取工程属性',
				);
			} else {
				return this.formatError('未能获取到工程属性', '可能没有打开的工程');
			}
		} catch (error) {
			return this.formatError(error, '获取工程属性失败');
		}
	}

	/**
	 * 获取项目中的文档列表
	 * @param {Object} params - 参数对象
	 * @param {string} params.projectUuid - 项目UUID，不提供则使用当前项目
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getDocumentList(params = {}) {
		try {
			let projectUuid = params.projectUuid;

			if (!projectUuid) {
				const projectInfo = await eda.dmt_Project.getCurrentProjectInfo();
				if (projectInfo) {
					projectUuid = projectInfo.uuid;
				} else {
					return this.formatError('未能获取到项目信息', '请提供项目UUID或确保有打开的工程');
				}
			}

			const documents = await eda.dmt_Project.getDocumentList(projectUuid);
			return this.formatSuccess(
				{
					documents,
					count: documents.length,
				},
				`成功获取项目文档列表，共${documents.length}个文档`,
			);
		} catch (error) {
			return this.formatError(error, '获取项目文档列表失败');
		}
	}

	/**
	 * 创建新文档
	 * @param {Object} params - 参数对象
	 * @param {string} params.name - 文档名称
	 * @param {string} params.type - 文档类型 (sch, pcb, lib, panel)
	 * @param {string} params.projectUuid - 项目UUID，不提供则使用当前项目
	 * @returns {Promise<Object>} - 执行结果
	 */
	async createDocument(params) {
		try {
			const name = params.name;
			const type = params.type;
			let projectUuid = params.projectUuid;

			if (!name || !type) {
				return this.formatError('缺少必要参数', '请提供文档名称和类型');
			}

			if (!projectUuid) {
				const projectInfo = await eda.dmt_Project.getCurrentProjectInfo();
				if (projectInfo) {
					projectUuid = projectInfo.uuid;
				} else {
					return this.formatError('未能获取到项目信息', '请提供项目UUID或确保有打开的工程');
				}
			}

			// 这里需要根据实际API实现文档创建
			// 以下为示例代码，实际实现可能不同
			const result = await eda.dmt_Project.createDocument({
				projectUuid,
				name,
				type,
			});

			return this.formatSuccess(result, `成功创建${type}类型文档: ${name}`);
		} catch (error) {
			return this.formatError(error, '创建文档失败');
		}
	}
}

// 导出文档适配器
window.DocumentAdapter = DocumentAdapter;
