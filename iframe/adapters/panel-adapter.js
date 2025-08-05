/**
 * 面板适配器
 * 处理面板相关API
 */
class PanelAdapter extends BaseAdapter {
    constructor() {
        super();
        this.initTools();
    }

    initTools() {
        this.registerTool(
            'getPanelInfo',
            '获取面板信息',
            () => this.getPanelInfo()
        );
        
        this.registerTool(
            'addPCBToPanel',
            '添加PCB到面板',
            (params) => this.addPCBToPanel(params)
        );
        
        this.registerTool(
            'arrangePCBs',
            '自动排列PCB',
            (params) => this.arrangePCBs(params)
        );
    }

    /**
     * 获取面板信息
     * @returns {Promise<Object>} - 执行结果
     */
    async getPanelInfo() {
        try {
            // 使用PCB_Panel类获取面板信息
            const panelInfo = await eda.pcb_Panel.getPanelInfo();
            return this.formatSuccess(panelInfo, '成功获取面板信息');
        } catch (error) {
            return this.formatError(error, '获取面板信息失败');
        }
    }

    /**
     * 添加PCB到面板
     * @param {Object} params - 参数对象
     * @param {string} params.pcbDocId - PCB文档ID
     * @param {Object} params.position - 放置位置
     * @returns {Promise<Object>} - 执行结果
     */
    async addPCBToPanel(params) {
        try {
            if (!params.pcbDocId) {
                return this.formatError('缺少必要参数', '请提供PCB文档ID');
            }
            
            // 使用PCB_Panel类添加PCB到面板
            const result = await eda.pcb_Panel.addPCBToPanel({
                pcbDocId: params.pcbDocId,
                position: params.position
            });
            return this.formatSuccess(result, '成功添加PCB到面板');
        } catch (error) {
            return this.formatError(error, '添加PCB到面板失败');
        }
    }

    /**
     * 自动排列PCB
     * @param {Object} params - 参数对象
     * @param {string} params.method - 排列方法 (grid, optimize)
     * @param {Object} params.options - 排列选项
     * @returns {Promise<Object>} - 执行结果
     */
    async arrangePCBs(params) {
        try {
            const method = params.method || 'grid';
            
            // 使用PCB_Panel类排列PCB
            const result = await eda.pcb_Panel.arrangePCBs({
                method: method,
                options: params.options
            });
            return this.formatSuccess(result, `成功使用${method}方法排列PCB`);
        } catch (error) {
            return this.formatError(error, '自动排列PCB失败');
        }
    }
}

// 导出面板适配器
window.PanelAdapter = PanelAdapter;