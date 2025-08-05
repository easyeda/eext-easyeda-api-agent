/**
 * 综合库适配器
 * 处理综合库相关API
 */
class LibraryAdapter extends BaseAdapter {
    constructor() {
        super();
        this.initTools();
    }

    initTools() {
        this.registerTool(
            'searchLibrary',
            '搜索库元件',
            (params) => this.searchLibrary(params)
        );
        
        this.registerTool(
            'getComponentInfo',
            '获取元件详细信息',
            (params) => this.getComponentInfo(params)
        );
        
        this.registerTool(
            'addToFavorites',
            '添加元件到收藏夹',
            (params) => this.addToFavorites(params)
        );
        
        this.registerTool(
            'getRecentComponents',
            '获取最近使用的元件',
            () => this.getRecentComponents()
        );
    }

    /**
     * 搜索库元件
     * @param {Object} params - 参数对象
     * @param {string} params.keyword - 搜索关键词
     * @param {string} params.category - 元件类别
     * @param {number} params.page - 页码
     * @param {number} params.pageSize - 每页数量
     * @returns {Promise<Object>} - 执行结果
     */
    async searchLibrary(params) {
        try {
            if (!params.keyword) {
                return this.formatError('缺少必要参数', '请提供搜索关键词');
            }
            
            // 使用LIB_LibrariesList类搜索库元件
            const result = await eda.lib_LibrariesList.searchComponents({
                keyword: params.keyword,
                category: params.category,
                page: params.page || 1,
                pageSize: params.pageSize || 20
            });
            
            return this.formatSuccess(result, `搜索到 ${result.total} 个匹配元件`);
        } catch (error) {
            return this.formatError(error, '搜索库元件失败');
        }
    }

    /**
     * 获取元件详细信息
     * @param {Object} params - 参数对象
     * @param {string} params.componentId - 元件ID
     * @returns {Promise<Object>} - 执行结果
     */
    async getComponentInfo(params) {
        try {
            if (!params.componentId) {
                return this.formatError('缺少必要参数', '请提供元件ID');
            }
            
            // 使用LIB_Device类获取元件信息
            const componentInfo = await eda.lib_Device.getComponentInfo(params.componentId);
            return this.formatSuccess(componentInfo, '成功获取元件详细信息');
        } catch (error) {
            return this.formatError(error, '获取元件详细信息失败');
        }
    }

    /**
     * 添加元件到收藏夹
     * @param {Object} params - 参数对象
     * @param {string} params.componentId - 元件ID
     * @returns {Promise<Object>} - 执行结果
     */
    async addToFavorites(params) {
        try {
            if (!params.componentId) {
                return this.formatError('缺少必要参数', '请提供元件ID');
            }
            
            // 使用LIB_Device类添加元件到收藏夹
            const result = await eda.lib_Device.addToFavorites(params.componentId);
            return this.formatSuccess(result, '成功添加元件到收藏夹');
        } catch (error) {
            return this.formatError(error, '添加元件到收藏夹失败');
        }
    }

    /**
     * 获取最近使用的元件
     * @returns {Promise<Object>} - 执行结果
     */
    async getRecentComponents() {
        try {
            // 使用LIB_LibrariesList类获取最近使用的元件
            const recentComponents = await eda.lib_LibrariesList.getRecentComponents();
            return this.formatSuccess(recentComponents, `成功获取 ${recentComponents.length} 个最近使用的元件`);
        } catch (error) {
            return this.formatError(error, '获取最近使用的元件失败');
        }
    }
}

// 导出综合库适配器
window.LibraryAdapter = LibraryAdapter;