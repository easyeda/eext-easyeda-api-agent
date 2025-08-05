/**
 * PCB适配器
 * 处理PCB和封装相关API
 */
class PCBAdapter extends BaseAdapter {
    constructor() {
        super();
        this.initTools();
    }

    initTools() {
        this.registerTool(
            'getSelectedPCBObjects',
            '获取当前选中的PCB对象信息',
            () => this.getSelectedPCBObjects()
        );
        
        this.registerTool(
            'createPCBObject',
            '创建新的PCB对象',
            (params) => this.createPCBObject(params)
        );
        
        this.registerTool(
            'getTrackInfo',
            '获取走线信息',
            (params) => this.getTrackInfo(params)
        );
        
        this.registerTool(
            'getPackageInfo',
            '获取封装信息',
            (params) => this.getPackageInfo(params)
        );
    }

    /**
     * 获取当前选中的PCB对象信息
     * @returns {Promise<Object>} - 执行结果
     */
    async getSelectedPCBObjects() {
        try {
            // 使用PCB_SelectControl类获取选中的PCB对象
            const selected = await eda.pcb_SelectControl.getSelectedObjects();
            return this.formatSuccess(selected, `获取到 ${selected ? selected.length : 0} 个选中PCB对象`);
        } catch (error) {
            return this.formatError(error, '获取选中PCB对象失败');
        }
    }

    /**
     * 创建新的PCB对象
     * @param {Object} params - 参数对象
     * @param {string} params.type - 对象类型 (track, pad, via, etc.)
     * @param {Object} params.properties - 对象属性
     * @returns {Promise<Object>} - 执行结果
     */
    async createPCBObject(params) {
        try {
            if (!params.type) {
                return this.formatError('缺少必要参数', '请提供PCB对象类型');
            }
            
            // 使用PCB_Document类创建PCB对象
            const result = await eda.pcb_Document.createObject(params);
            return this.formatSuccess(result, `成功创建${params.type}对象`);
        } catch (error) {
            return this.formatError(error, '创建PCB对象失败');
        }
    }

    /**
     * 获取走线信息
     * @param {Object} params - 参数对象
     * @param {string} params.trackId - 走线ID
     * @returns {Promise<Object>} - 执行结果
     */
    async getTrackInfo(params) {
        try {
            if (!params.trackId) {
                return this.formatError('缺少必要参数', '请提供走线ID');
            }
            
            // 使用PCB_Document类获取走线信息
            const trackInfo = await eda.pcb_Document.getTrackInfo(params.trackId);
            return this.formatSuccess(trackInfo, '成功获取走线信息');
        } catch (error) {
            return this.formatError(error, '获取走线信息失败');
        }
    }

    /**
     * 获取封装信息
     * @param {Object} params - 参数对象
     * @param {string} params.packageId - 封装ID
     * @returns {Promise<Object>} - 执行结果
     */
    async getPackageInfo(params) {
        try {
            if (!params.packageId) {
                return this.formatError('缺少必要参数', '请提供封装ID');
            }
            
            // 使用PCB_Document类获取封装信息
            const packageInfo = await eda.pcb_Document.getPackageInfo(params.packageId);
            return this.formatSuccess(packageInfo, '成功获取封装信息');
        } catch (error) {
            return this.formatError(error, '获取封装信息失败');
        }
    }
}

// 导出PCB适配器
window.PCBAdapter = PCBAdapter;