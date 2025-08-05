/**
 * 适配器基类
 * 提供所有适配器共用的基础功能和统一的返回格式
 */
class BaseAdapter {
    constructor() {
        this.tools = {};
    }

    /**
     * 注册工具方法
     * @param {string} name - 工具名称
     * @param {string} description - 工具描述
     * @param {Function} executeFunction - 执行函数
     */
    registerTool(name, description, executeFunction) {
        this.tools[name] = {
            description,
            execute: executeFunction
        };
    }

    /**
     * 执行工具方法
     * @param {string} name - 工具名称
     * @param {Object} params - 参数对象
     * @returns {Promise<Object>} - 执行结果
     */
    async executeTool(name, params = {}) {
        if (this.tools[name]) {
            try {
                return await this.tools[name].execute(params);
            } catch (error) {
                return this.formatError(error);
            }
        } else {
            return this.formatError(`未知工具: ${name}`, '工具不存在');
        }
    }

    /**
     * 获取可用工具列表
     * @returns {Array} - 工具列表
     */
    getAvailableTools() {
        return Object.keys(this.tools).map(name => ({
            name,
            description: this.tools[name].description
        }));
    }

    /**
     * 格式化成功响应
     * @param {*} data - 响应数据
     * @param {string} message - 成功消息
     * @returns {Object} - 格式化的响应对象
     */
    formatSuccess(data, message = '操作成功') {
        return {
            success: true,
            data,
            message
        };
    }

    /**
     * 格式化错误响应
     * @param {Error|string} error - 错误对象或错误消息
     * @param {string} message - 友好错误消息
     * @returns {Object} - 格式化的错误响应对象
     */
    formatError(error, message = '操作失败') {
        return {
            success: false,
            error: error instanceof Error ? error.message : error,
            message
        };
    }
}

// 导出基类
window.BaseAdapter = BaseAdapter;