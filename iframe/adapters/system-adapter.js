/**
 * 系统适配器
 * 处理系统级API，如对话框、消息提示、剪贴板、外部请求、运行环境等
 */
class SystemAdapter extends BaseAdapter {
	constructor() {
		super();
		this.initTools();
	}

	initTools() {
		// 原有工具
		this.registerTool('showMessage', t('toolDescShowMessage'), (params) => this.showMessage(params));

		this.registerTool('showDialog', '显示对话框', (params) => this.showDialog(params));

		// 外部请求类
		this.registerTool('httpRequest', '发起HTTP请求', (params) => this.httpRequest(params));

		// 对话框类
		this.registerTool('showConfirmationDialog', '显示确认对话框', (params) => this.showConfirmationDialog(params));

		this.registerTool('showInformationDialog', '显示信息对话框', (params) => this.showInformationDialog(params));

		this.registerTool('showInputDialog', '显示输入对话框', (params) => this.showInputDialog(params));

		this.registerTool('showSelectDialog', '显示选择对话框', (params) => this.showSelectDialog(params));

		// 运行环境类
		this.registerTool('getEditorInfo', '获取编辑器信息', () => this.getEditorInfo());

		this.registerTool('getEnvironmentInfo', '获取运行环境信息', () => this.getEnvironmentInfo());

		// 文件管理类
		this.registerTool('getProjectFile', '获取工程文件', (params) => this.getProjectFile(params));

		this.registerTool('getDocumentFile', '获取文档文件', (params) => this.getDocumentFile(params));

		this.registerTool('getDocumentSource', '获取文档源码', () => this.getDocumentSource());

		this.registerTool('getDocumentFootprintSources', '获取文档封装源码', () => this.getDocumentFootprintSources());

		this.registerTool('setDocumentSource', '修改文档源码', (params) => this.setDocumentSource(params));

		this.registerTool('getProjectFileByProjectUuid', '使用工程UUID获取工程文件', (params) => this.getProjectFileByProjectUuid(params));

		this.registerTool('getDeviceFileByDeviceUuid', '使用器件UUID获取器件文件', (params) => this.getDeviceFileByDeviceUuid(params));

		this.registerTool('getFootprintFileByFootprintUuid', '使用封装UUID获取封装文件', (params) => this.getFootprintFileByFootprintUuid(params));

		this.registerTool('getCbbFileByCbbUuid', '使用复用模块UUID获取复用模块文件', (params) => this.getCbbFileByCbbUuid(params));

		this.registerTool('getPanelLibraryFileByPanelLibraryUuid', '使用面板库UUID获取面板库文件', (params) =>
			this.getPanelLibraryFileByPanelLibraryUuid(params),
		);

		// 文件系统交互类
		this.registerTool('getExtensionFile', '获取扩展内的文件', (params) => this.getExtensionFile(params));

		this.registerTool('openReadFileDialog', '打开读入文件窗口', (params) => this.openReadFileDialog(params));

		this.registerTool('saveFile', '保存文件', (params) => this.saveFile(params));

		this.registerTool('readFileFromFileSystem', '从文件系统读取文件', (params) => this.readFileFromFileSystem(params));

		this.registerTool('saveFileToFileSystem', '向文件系统写入文件', (params) => this.saveFileToFileSystem(params));

		this.registerTool('listFilesOfFileSystem', '查看文件系统路径下的文件列表', (params) => this.listFilesOfFileSystem(params));

		this.registerTool('deleteFileInFileSystem', '删除文件系统内的文件', (params) => this.deleteFileInFileSystem(params));

		this.registerTool('getEdaPath', '获取EDA文档目录路径', () => this.getEdaPath());

		this.registerTool('getDocumentsPath', '获取文档目录路径', () => this.getDocumentsPath());

		this.registerTool('getLibrariesPaths', '获取库目录路径', () => this.getLibrariesPaths());

		this.registerTool('getProjectsPaths', '获取工程目录路径', () => this.getProjectsPaths());
	}

	/**
	 * 显示消息提示
	 * @param {Object} params - 参数对象
	 * @param {string} params.message - 消息内容
	 * @param {string} params.type - 消息类型 (info, warning, error)
	 * @returns {Promise<Object>} - 执行结果
	 */
	async showMessage(params) {
		try {
			const message = params.message || '测试消息';
			const type = params.type || 'info';

			// 使用SYS_Message类显示消息
			switch (type) {
				case 'warning':
					eda.sys_Message.showWarningMessage(message);
					break;
				case 'error':
					eda.sys_Message.showErrorMessage(message);
					break;
				default:
					eda.sys_Message.showMessage(message);
			}

			return this.formatSuccess(null, `已显示${type}消息: ${message}`);
		} catch (error) {
			return this.formatError(error, '显示消息失败');
		}
	}

	/**
	 * 显示对话框（兼容旧版本）
	 * @param {Object} params - 参数对象
	 * @param {string} params.title - 对话框标题
	 * @param {string} params.message - 对话框内容
	 * @param {string} params.type - 对话框类型 (info, warning, error, confirm)
	 * @returns {Promise<Object>} - 执行结果
	 */
	async showDialog(params) {
		try {
			const title = params.title || '提示';
			const message = params.message || '这是一个对话框';
			const type = params.type || 'info';

			// 使用SYS_Dialog类显示对话框
			let result;
			switch (type) {
				case 'warning':
					result = await eda.sys_Dialog.showWarningMessage(message, title);
					break;
				case 'error':
					result = await eda.sys_Dialog.showErrorMessage(message, title);
					break;
				case 'confirm':
					result = await eda.sys_Dialog.showConfirmMessage(message, title);
					break;
				default:
					result = await eda.sys_Dialog.showInformationMessage(message, title);
			}

			return this.formatSuccess({ result }, `对话框操作完成: ${result}`);
		} catch (error) {
			return this.formatError(error, '显示对话框失败');
		}
	}

	/**
	 * 发起HTTP请求
	 * @param {Object} params - 参数对象
	 * @param {string} params.url - 请求地址
	 * @param {string} params.method - 请求方法 (GET, POST, HEAD, PUT, DELETE, PATCH)
	 * @param {string|Blob|FormData|URLSearchParams} params.data - 请求数据
	 * @param {Object} params.options - 请求选项
	 * @returns {Promise<Object>} - 执行结果
	 */
	async httpRequest(params) {
		try {
			if (!params.url) {
				return this.formatError('缺少必要参数', '请提供请求地址');
			}

			const url = params.url;
			const method = params.method || 'GET';
			const data = params.data;
			const options = params.options || {};

			const response = await eda.sys_ClientUrl.request(url, method, data, options);

			// 尝试解析响应数据
			let responseData;
			try {
				responseData = await response.text();
				// 尝试解析为JSON
				try {
					responseData = JSON.parse(responseData);
				} catch (e) {
					// 如果不是JSON，保持为文本
				}
			} catch (e) {
				responseData = null;
			}

			return this.formatSuccess(
				{
					status: response.status,
					statusText: response.statusText,
					headers: Object.fromEntries(response.headers.entries()),
					data: responseData,
				},
				`HTTP请求成功: ${method} ${url}`,
			);
		} catch (error) {
			return this.formatError(error, 'HTTP请求失败');
		}
	}

	/**
	 * 显示确认对话框
	 * @param {Object} params - 参数对象
	 * @param {string} params.content - 消息文本
	 * @param {string} params.title - 弹出窗口标题
	 * @param {string} params.mainButtonTitle - 主要按钮标题
	 * @param {string} params.buttonTitle - 次要按钮标题
	 * @returns {Promise<Object>} - 执行结果
	 */
	async showConfirmationDialog(params) {
		try {
			const content = params.content || '确认执行此操作吗？';
			const title = params.title;
			const mainButtonTitle = params.mainButtonTitle;
			const buttonTitle = params.buttonTitle;

			return new Promise((resolve) => {
				eda.sys_Dialog.showConfirmationMessage(content, title, mainButtonTitle, buttonTitle, (mainButtonClicked) => {
					resolve(
						this.formatSuccess(
							{
								confirmed: mainButtonClicked,
								mainButtonClicked,
							},
							`用户${mainButtonClicked ? '确认' : '取消'}了操作`,
						),
					);
				});
			});
		} catch (error) {
			return this.formatError(error, '显示确认对话框失败');
		}
	}

	/**
	 * 显示信息对话框
	 * @param {Object} params - 参数对象
	 * @param {string} params.content - 消息文本
	 * @param {string} params.title - 弹出窗口标题
	 * @param {string} params.buttonTitle - 按钮标题
	 * @returns {Promise<Object>} - 执行结果
	 */
	async showInformationDialog(params) {
		try {
			const content = params.content || '这是一条信息';
			const title = params.title;
			const buttonTitle = params.buttonTitle;

			eda.sys_Dialog.showInformationMessage(content, title, buttonTitle);

			return this.formatSuccess(null, '信息对话框已显示');
		} catch (error) {
			return this.formatError(error, '显示信息对话框失败');
		}
	}

	/**
	 * 显示输入对话框
	 * @param {Object} params - 参数对象
	 * @param {string} params.beforeContent - 输入框上方文字
	 * @param {string} params.afterContent - 输入框下方文字
	 * @param {string} params.title - 弹出窗口标题
	 * @param {string} params.type - 输入框类型 (color|date|datetime-local|email|month|number|password|tel|text|time|url|week)
	 * @param {string|number} params.value - 输入框默认值
	 * @param {Object} params.otherProperty - 其它参数，参考 HTML Input element 属性
	 * @param {number} params.otherProperty.max - 最大值
	 * @param {number} params.otherProperty.maxlength - 最大长度
	 * @param {number} params.otherProperty.min - 最小值
	 * @param {number} params.otherProperty.minlength - 最小长度
	 * @param {boolean} params.otherProperty.multiple - 是否支持多个值
	 * @param {RegExp} params.otherProperty.pattern - 验证模式
	 * @param {string} params.otherProperty.placeholder - 占位符文本
	 * @param {boolean} params.otherProperty.readonly - 是否只读
	 * @param {number} params.otherProperty.step - 步长
	 * @returns {Promise<Object>} - 执行结果
	 */
	async showInputDialog(params) {
		try {
			const beforeContent = params.beforeContent;
			const afterContent = params.afterContent;
			const title = params.title;
			// 修正：原类型定义中 'mouth' 应该是 'month'
			const type = params.type || 'text';
			const value = params.value;
			const otherProperty = params.otherProperty;

			// 验证输入类型
			const validTypes = ['color', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'tel', 'text', 'time', 'url', 'week'];
			if (type && !validTypes.includes(type)) {
				return this.formatError('无效的输入类型', `支持的类型: ${validTypes.join(', ')}`);
			}

			return new Promise((resolve) => {
				eda.sys_Dialog.showInputDialog(beforeContent, afterContent, title, type, value, otherProperty, (inputValue) => {
					if (inputValue !== null && inputValue !== undefined) {
						resolve(
							this.formatSuccess(
								{
									value: inputValue,
									cancelled: false,
									type: type,
								},
								`用户输入了值: ${inputValue}`,
							),
						);
					} else {
						resolve(
							this.formatSuccess(
								{
									value: null,
									cancelled: true,
									type: type,
								},
								'用户取消了输入',
							),
						);
					}
				});
			});
		} catch (error) {
			return this.formatError(error, '显示输入对话框失败');
		}
	}

	/**
	 * 显示选择对话框
	 * @param {Object} params - 参数对象
	 * @param {Array} params.options - 选项列表
	 * @param {string} params.beforeContent - 选择框上方文字
	 * @param {string} params.afterContent - 选择框下方文字
	 * @param {string} params.title - 选择框标题
	 * @param {string|Array} params.defaultOption - 默认选项
	 * @param {boolean} params.multiple - 是否支持多选
	 * @returns {Promise<Object>} - 执行结果
	 */
	async showSelectDialog(params) {
		try {
			if (!params.options || !Array.isArray(params.options)) {
				return this.formatError('缺少必要参数', '请提供选项列表');
			}

			const options = params.options;
			const beforeContent = params.beforeContent;
			const afterContent = params.afterContent;
			const title = params.title;
			const defaultOption = params.defaultOption;
			const multiple = params.multiple || false;

			return new Promise((resolve) => {
				eda.sys_Dialog.showSelectDialog(options, beforeContent, afterContent, title, defaultOption, multiple, (selectedValue) => {
					if (selectedValue !== null && selectedValue !== undefined) {
						resolve(
							this.formatSuccess(
								{
									value: selectedValue,
									cancelled: false,
									multiple,
								},
								`用户选择了: ${Array.isArray(selectedValue) ? selectedValue.join(', ') : selectedValue}`,
							),
						);
					} else {
						resolve(
							this.formatSuccess(
								{
									value: null,
									cancelled: true,
									multiple,
								},
								'用户取消了选择',
							),
						);
					}
				});
			});
		} catch (error) {
			return this.formatError(error, '显示选择对话框失败');
		}
	}

	/**
	 * 获取编辑器信息
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getEditorInfo() {
		try {
			const editorInfo = {
				version: eda.sys_Environment.getEditorCurrentVersion(),
				compiledDate: eda.sys_Environment.getEditorCompliedDate(),
			};

			return this.formatSuccess(editorInfo, '成功获取编辑器信息');
		} catch (error) {
			return this.formatError(error, '获取编辑器信息失败');
		}
	}

	/**
	 * 获取运行环境信息
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getEnvironmentInfo() {
		try {
			const environmentInfo = {
				isClient: eda.sys_Environment.isClient(),
				isWeb: eda.sys_Environment.isWeb(),
				isEasyEDAProEdition: eda.sys_Environment.isEasyEDAProEdition(),
				isJLCEDAProEdition: eda.sys_Environment.isJLCEDAProEdition ? eda.sys_Environment.isJLCEDAProEdition() : false,
				isProPrivateEdition: eda.sys_Environment.isProPrivateEdition ? eda.sys_Environment.isProPrivateEdition() : false,
				isOnlineMode: eda.sys_Environment.isOnlineMode ? eda.sys_Environment.isOnlineMode() : false,
				isOfflineMode: eda.sys_Environment.isOfflineMode ? eda.sys_Environment.isOfflineMode() : false,
			};

			return this.formatSuccess(environmentInfo, '成功获取运行环境信息');
		} catch (error) {
			return this.formatError(error, '获取运行环境信息失败');
		}
	}

	/**
	 * 获取工程文件
	 * @param {Object} params - 参数对象
	 * @param {string} params.fileName - 文件名
	 * @param {string} params.password - 加密密码
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getProjectFile(params = {}) {
		try {
			const fileName = params.fileName;
			const password = params.password;

			const file = await eda.sys_FileManager.getProjectFile(fileName, password);

			if (file) {
				return this.formatSuccess(
					{
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
					},
					`成功获取工程文件: ${file.name}`,
				);
			} else {
				return this.formatSuccess(null, '当前未打开工程或数据获取失败');
			}
		} catch (error) {
			return this.formatError(error, '获取工程文件失败');
		}
	}

	/**
	 * 获取文档文件
	 * @param {Object} params - 参数对象
	 * @param {string} params.fileName - 文件名
	 * @param {string} params.password - 加密密码
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getDocumentFile(params = {}) {
		try {
			const fileName = params.fileName;
			const password = params.password;

			const file = await eda.sys_FileManager.getDocumentFile(fileName, password);

			if (file) {
				return this.formatSuccess(
					{
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
					},
					`成功获取文档文件: ${file.name}`,
				);
			} else {
				return this.formatSuccess(null, '当前未打开文档或数据获取失败');
			}
		} catch (error) {
			return this.formatError(error, '获取文档文件失败');
		}
	}

	/**
	 * 获取文档源码
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getDocumentSource() {
		try {
			const source = await eda.sys_FileManager.getDocumentSource();

			if (source !== undefined) {
				return this.formatSuccess({ source }, '成功获取文档源码');
			} else {
				return this.formatSuccess(null, '当前未打开文档或数据获取失败');
			}
		} catch (error) {
			return this.formatError(error, '获取文档源码失败');
		}
	}

	/**
	 * 获取文档封装源码
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getDocumentFootprintSources() {
		try {
			const sources = await eda.sys_FileManager.getDocumentFootprintSources();

			return this.formatSuccess({ sources, count: sources.length }, `成功获取${sources.length}个文档封装源码`);
		} catch (error) {
			return this.formatError(error, '获取文档封装源码失败');
		}
	}

	/**
	 * 修改文档源码
	 * @param {Object} params - 参数对象
	 * @param {string} params.source - 文档源码
	 * @returns {Promise<Object>} - 执行结果
	 */
	async setDocumentSource(params) {
		try {
			if (!params.source) {
				return this.formatError('缺少必要参数', '请提供文档源码');
			}

			const success = await eda.sys_FileManager.setDocumentSource(params.source);

			if (success) {
				return this.formatSuccess({ success }, '文档源码修改成功');
			} else {
				return this.formatSuccess({ success }, '文档源码格式错误，修改失败');
			}
		} catch (error) {
			return this.formatError(error, '修改文档源码失败');
		}
	}

	/**
	 * 使用工程UUID获取工程文件
	 * @param {Object} params - 参数对象
	 * @param {string} params.projectUuid - 工程UUID
	 * @param {string} params.fileName - 文件名
	 * @param {string} params.password - 加密密码
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getProjectFileByProjectUuid(params) {
		try {
			if (!params.projectUuid) {
				return this.formatError('缺少必要参数', '请提供工程UUID');
			}

			const projectUuid = params.projectUuid;
			const fileName = params.fileName;
			const password = params.password;

			const file = await eda.sys_FileManager.getProjectFileByProjectUuid(projectUuid, fileName, password);

			if (file) {
				return this.formatSuccess(
					{
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
						projectUuid,
					},
					`成功获取工程文件: ${file.name}`,
				);
			} else {
				return this.formatSuccess(null, '工程不存在或数据获取失败');
			}
		} catch (error) {
			return this.formatError(error, '使用工程UUID获取工程文件失败');
		}
	}

	/**
	 * 使用器件UUID获取器件文件
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>} params.deviceUuid - 器件UUID或器件UUID列表
	 * @param {string} params.libraryUuid - 库UUID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getDeviceFileByDeviceUuid(params) {
		try {
			if (!params.deviceUuid) {
				return this.formatError('缺少必要参数', '请提供器件UUID');
			}

			const deviceUuid = params.deviceUuid;
			const libraryUuid = params.libraryUuid;

			const file = await eda.sys_FileManager.getDeviceFileByDeviceUuid(deviceUuid, libraryUuid);

			if (file) {
				return this.formatSuccess(
					{
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
						deviceUuid,
						libraryUuid,
					},
					`成功获取器件文件: ${file.name}`,
				);
			} else {
				return this.formatSuccess(null, '器件不存在或数据获取失败');
			}
		} catch (error) {
			return this.formatError(error, '使用器件UUID获取器件文件失败');
		}
	}

	/**
	 * 使用封装UUID获取封装文件
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>} params.footprintUuid - 封装UUID或封装UUID列表
	 * @param {string} params.libraryUuid - 库UUID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getFootprintFileByFootprintUuid(params) {
		try {
			if (!params.footprintUuid) {
				return this.formatError('缺少必要参数', '请提供封装UUID');
			}

			const footprintUuid = params.footprintUuid;
			const libraryUuid = params.libraryUuid;

			const file = await eda.sys_FileManager.getFootprintFileByFootprintUuid(footprintUuid, libraryUuid);

			if (file) {
				return this.formatSuccess(
					{
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
						footprintUuid,
						libraryUuid,
					},
					`成功获取封装文件: ${file.name}`,
				);
			} else {
				return this.formatSuccess(null, '封装不存在或数据获取失败');
			}
		} catch (error) {
			return this.formatError(error, '使用封装UUID获取封装文件失败');
		}
	}

	/**
	 * 使用复用模块UUID获取复用模块文件
	 * @param {Object} params - 参数对象
	 * @param {string} params.cbbUuid - 复用模块UUID
	 * @param {string} params.libraryUuid - 库UUID
	 * @param {string} params.cbbName - 复用模块名
	 * @param {string} params.password - 加密密码
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getCbbFileByCbbUuid(params) {
		try {
			if (!params.cbbUuid) {
				return this.formatError('缺少必要参数', '请提供复用模块UUID');
			}

			const cbbUuid = params.cbbUuid;
			const libraryUuid = params.libraryUuid;
			const cbbName = params.cbbName;
			const password = params.password;

			const file = await eda.sys_FileManager.getCbbFileByCbbUuid(cbbUuid, libraryUuid, cbbName, password);

			if (file) {
				return this.formatSuccess(
					{
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
						cbbUuid,
						libraryUuid,
					},
					`成功获取复用模块文件: ${file.name}`,
				);
			} else {
				return this.formatSuccess(null, '复用模块不存在或数据获取失败');
			}
		} catch (error) {
			return this.formatError(error, '使用复用模块UUID获取复用模块文件失败');
		}
	}

	/**
	 * 使用面板库UUID获取面板库文件
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>} params.panelLibraryUuid - 面板库UUID或面板库UUID列表
	 * @param {string} params.libraryUuid - 库UUID
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getPanelLibraryFileByPanelLibraryUuid(params) {
		try {
			if (!params.panelLibraryUuid) {
				return this.formatError('缺少必要参数', '请提供面板库UUID');
			}

			const panelLibraryUuid = params.panelLibraryUuid;
			const libraryUuid = params.libraryUuid;

			const file = await eda.sys_FileManager.getPanelLibraryFileByPanelLibraryUuid(panelLibraryUuid, libraryUuid);

			if (file) {
				return this.formatSuccess(
					{
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
						panelLibraryUuid,
						libraryUuid,
					},
					`成功获取面板库文件: ${file.name}`,
				);
			} else {
				return this.formatSuccess(null, '面板库不存在或数据获取失败');
			}
		} catch (error) {
			return this.formatError(error, '使用面板库UUID获取面板库文件失败');
		}
	}

	/**
	 * 获取扩展内的文件
	 * @param {Object} params - 参数对象
	 * @param {string} params.uri - 文件路径
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getExtensionFile(params) {
		try {
			if (!params.uri) {
				return this.formatError('缺少必要参数', '请提供文件路径');
			}

			const uri = params.uri;
			const file = await eda.sys_FileSystem.getExtensionFile(uri);

			if (file) {
				return this.formatSuccess(
					{
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
						uri,
					},
					`成功获取扩展文件: ${file.name}`,
				);
			} else {
				return this.formatSuccess(null, '文件不存在或获取失败');
			}
		} catch (error) {
			return this.formatError(error, '获取扩展文件失败');
		}
	}

	/**
	 * 打开读入文件窗口
	 * @param {Object} params - 参数对象
	 * @param {string|Array<string>} params.filenameExtensions - 文件扩展名
	 * @returns {Promise<Object>} - 执行结果
	 */
	async openReadFileDialog(params = {}) {
		try {
			const filenameExtensions = params.filenameExtensions;
			const file = await eda.sys_FileSystem.openReadFileDialog(filenameExtensions);

			if (file) {
				return this.formatSuccess(
					{
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
					},
					`用户选择了文件: ${file.name}`,
				);
			} else {
				return this.formatSuccess(null, '用户取消了文件选择');
			}
		} catch (error) {
			return this.formatError(error, '打开文件选择对话框失败');
		}
	}

	/**
	 * 保存文件
	 * @param {Object} params - 参数对象
	 * @param {File|Blob} params.fileData - 文件数据
	 * @param {string} params.fileName - 文件名称
	 * @returns {Promise<Object>} - 执行结果
	 */
	async saveFile(params) {
		try {
			if (!params.fileData) {
				return this.formatError('缺少必要参数', '请提供文件数据');
			}

			const fileData = params.fileData;
			const fileName = params.fileName;

			await eda.sys_FileSystem.saveFile(fileData, fileName);

			return this.formatSuccess(
				{
					fileName: fileName || fileData.name || '未知文件',
					size: fileData.size,
				},
				`文件保存成功: ${fileName || fileData.name || '未知文件'}`,
			);
		} catch (error) {
			return this.formatError(error, '保存文件失败');
		}
	}

	/**
	 * 从文件系统读取文件
	 * @param {Object} params - 参数对象
	 * @param {string} params.uri - 文件资源定位符
	 * @returns {Promise<Object>} - 执行结果
	 */
	async readFileFromFileSystem(params) {
		try {
			if (!params.uri) {
				return this.formatError('缺少必要参数', '请提供文件路径');
			}

			const uri = params.uri;
			const file = await eda.sys_FileSystem.readFileFromFileSystem(uri);

			if (file) {
				return this.formatSuccess(
					{
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
						uri,
					},
					`成功从文件系统读取文件: ${file.name}`,
				);
			} else {
				return this.formatSuccess(null, '文件不存在或读取失败');
			}
		} catch (error) {
			return this.formatError(error, '从文件系统读取文件失败');
		}
	}

	/**
	 * 向文件系统写入文件
	 * @param {Object} params - 参数对象
	 * @param {string} params.uri - 文件资源定位符
	 * @param {File|Blob} params.fileData - 文件数据
	 * @param {string} params.fileName - 文件名称
	 * @param {boolean} params.force - 强制写入
	 * @returns {Promise<Object>} - 执行结果
	 */
	async saveFileToFileSystem(params) {
		try {
			if (!params.uri || !params.fileData) {
				return this.formatError('缺少必要参数', '请提供文件路径和文件数据');
			}

			const uri = params.uri;
			const fileData = params.fileData;
			const fileName = params.fileName;
			const force = params.force || false;

			const success = await eda.sys_FileSystem.saveFileToFileSystem(uri, fileData, fileName, force);

			if (success) {
				return this.formatSuccess(
					{
						uri,
						fileName: fileName || fileData.name || '未知文件',
						size: fileData.size,
						force,
					},
					`文件写入文件系统成功: ${fileName || fileData.name || '未知文件'}`,
				);
			} else {
				return this.formatSuccess({ success: false }, '文件写入失败，可能是文件已存在且未设置强制覆盖');
			}
		} catch (error) {
			return this.formatError(error, '向文件系统写入文件失败');
		}
	}

	/**
	 * 查看文件系统路径下的文件列表
	 * @param {Object} params - 参数对象
	 * @param {string} params.folderPath - 目录路径
	 * @param {boolean} params.recursive - 是否递归获取所有子文件
	 * @returns {Promise<Object>} - 执行结果
	 */
	async listFilesOfFileSystem(params) {
		try {
			if (!params.folderPath) {
				return this.formatError('缺少必要参数', '请提供目录路径');
			}

			const folderPath = params.folderPath;
			const recursive = params.recursive || false;

			const fileList = await eda.sys_FileSystem.listFilesOfFileSystem(folderPath, recursive);

			return this.formatSuccess(
				{
					folderPath,
					recursive,
					fileList,
					count: fileList.length,
				},
				`成功获取目录文件列表，共${fileList.length}个文件`,
			);
		} catch (error) {
			return this.formatError(error, '获取文件系统文件列表失败');
		}
	}

	/**
	 * 删除文件系统内的文件
	 * @param {Object} params - 参数对象
	 * @param {string} params.uri - 文件资源定位符
	 * @param {boolean} params.force - 强制删除文件夹
	 * @returns {Promise<Object>} - 执行结果
	 */
	async deleteFileInFileSystem(params) {
		try {
			if (!params.uri) {
				return this.formatError('缺少必要参数', '请提供文件路径');
			}

			const uri = params.uri;
			const force = params.force || false;

			const success = await eda.sys_FileSystem.deleteFileInFileSystem(uri, force);

			if (success) {
				return this.formatSuccess(
					{
						uri,
						force,
					},
					`文件删除成功: ${uri}`,
				);
			} else {
				return this.formatSuccess({ success: false }, '文件删除失败，可能是文件不存在或权限不足');
			}
		} catch (error) {
			return this.formatError(error, '删除文件系统文件失败');
		}
	}

	/**
	 * 获取EDA文档目录路径
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getEdaPath() {
		try {
			const edaPath = await eda.sys_FileSystem.getEdaPath();

			return this.formatSuccess({ edaPath }, `成功获取EDA文档目录路径: ${edaPath}`);
		} catch (error) {
			return this.formatError(error, '获取EDA文档目录路径失败');
		}
	}

	/**
	 * 获取文档目录路径
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getDocumentsPath() {
		try {
			const documentsPath = await eda.sys_FileSystem.getDocumentsPath();

			return this.formatSuccess({ documentsPath }, `成功获取文档目录路径: ${documentsPath}`);
		} catch (error) {
			return this.formatError(error, '获取文档目录路径失败');
		}
	}

	/**
	 * 获取库目录路径
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getLibrariesPaths() {
		try {
			const librariesPaths = await eda.sys_FileSystem.getLibrariesPaths();

			return this.formatSuccess(
				{
					librariesPaths,
					count: librariesPaths.length,
				},
				`成功获取库目录路径，共${librariesPaths.length}个路径`,
			);
		} catch (error) {
			return this.formatError(error, '获取库目录路径失败');
		}
	}

	/**
	 * 获取工程目录路径
	 * @returns {Promise<Object>} - 执行结果
	 */
	async getProjectsPaths() {
		try {
			const projectsPaths = await eda.sys_FileSystem.getProjectsPaths();

			return this.formatSuccess(
				{
					projectsPaths,
					count: projectsPaths.length,
				},
				`成功获取工程目录路径，共${projectsPaths.length}个路径`,
			);
		} catch (error) {
			return this.formatError(error, '获取工程目录路径失败');
		}
	}
}

// 导出系统适配器
window.SystemAdapter = SystemAdapter;
