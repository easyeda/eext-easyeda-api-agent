/**
 * 适配器统一导出入口
 * 用于初始化和管理所有适配器
 */
class AdapterManager {
    constructor() {
        this.adapters = {};
        this.tools = {};
        this.initAdapters();
    }

    /**
     * 初始化所有适配器
     */
    initAdapters() {
        // 初始化各个适配器
        this.adapters.system = new SystemAdapter();
        this.adapters.document = new DocumentAdapter();
        this.adapters.schematic = new SchematicAdapter();
        this.adapters.pcb = new PCBAdapter();
        this.adapters.panel = new PanelAdapter();
        this.adapters.library = new LibraryAdapter();
        
        // 收集所有工具
        this.collectTools();
    }

    /**
     * 收集所有适配器中的工具
     */
    collectTools() {
        for (const [adapterName, adapter] of Object.entries(this.adapters)) {
            const adapterTools = adapter.getAvailableTools();
            
            adapterTools.forEach(tool => {
                // 添加适配器名称前缀，避免命名冲突
                const toolName = `${adapterName}.${tool.name}`;
                
                this.tools[toolName] = {
                    name: toolName,
                    description: tool.description,
                    adapter: adapterName,
                    originalName: tool.name
                };
            });
        }
    }

    /**
     * 获取所有可用工具列表
     * @returns {Array} - 工具列表
     */
    getAvailableTools() {
        return Object.values(this.tools);
    }

    /**
     * 执行工具方法
     * @param {string} name - 工具名称（包含适配器前缀）
     * @param {Object} params - 参数对象
     * @returns {Promise<Object>} - 执行结果
     */
    async executeTool(name, params = {}) {
        const toolInfo = this.tools[name];
        
        if (!toolInfo) {
            return {
                success: false,
                error: `未知工具: ${name}`,
                message: '工具不存在'
            };
        }
        
        const adapter = this.adapters[toolInfo.adapter];
        return await adapter.executeTool(toolInfo.originalName, params);
    }
}

// 创建全局适配器管理器实例
window.adapterManager = new AdapterManager();